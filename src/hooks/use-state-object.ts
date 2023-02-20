import { useMemo, useReducer } from "react"
import produce, { castImmutable } from "immer"
import { isEqual } from "lodash-es"
import { NonEmpty } from "~utils/types"

export interface SetValue<T> {
  <K extends keyof T>(
    next: NonEmpty<Pick<T, K>> | null,
    restoreInitial?: boolean
  ): void
}

export interface setCallback<T> {
  <K extends keyof T>(
    next: (prev: T) => NonEmpty<Pick<T, K>> | null | void,
    restoreInitial?: boolean
  ): void
}

/**
 * useState alternative for objects
 *
 * has setter which allows for more powerful way of setting state:
 * - pass strongly typed partial to be mergerd
 * - callback utilizing immer! Either a void function which can "immutably mutate"
 * object or return a strongly typed partial to be merged
 * - provides `restoreInitial` parameter which resets any non present properties
 * in setter when passing partial states
 *
 * does not cause re-renders if a setter's payload and current state
 * are identical. In that case previous object reference persists.
 */
function useStateObject<S extends object>(initialState: S) {
  initialState = useMemo(() => initialState, [])

  const [state, dispatch] = useReducer(
    (prev: S, next: (prev: S) => S) => next(prev),
    initialState
  )

  function createPayload<K extends keyof S>(
    prev: S,
    next: S | Pick<S, K> | null,
    restoreInitial?: boolean
  ) {
    const payload = { ...(restoreInitial ? initialState : prev), ...next }
    return isEqual(prev, payload) ? prev : payload
  }

  const setValue: SetValue<S> = (next, restore) =>
    dispatch((prev) => createPayload(prev, next, restore))

  const setCallback: setCallback<S> = (next, restore) =>
    dispatch((prev) => {
      const result = <S>produce(next)(castImmutable(prev))
      return createPayload(prev, result, restore)
    })

  return [
    state,
    useMemo(() => Object.assign(setValue, { immer: setCallback }), []),
  ] as const
}

export default useStateObject

/*
  Resources:
  https://builder.io/blog/use-reducer
  https://redux-toolkit.js.org/usage/immer-reducers#benefits-of-immer
  https://twitter.com/DavidKPiano/status/1604870393084665856

  Notes:
  state setter typings are similiar to class based setState.
  the reason the callback is accesed through separate prop
  is that ts sometimes has trouble discriminating between
  a Pick based value or callback union and thus may
  include edge cases where type errors aren't reported

  There are multiple tickets on DefinitelyTyped's repo on the matter,
  hence this approach in the meantime
*/
