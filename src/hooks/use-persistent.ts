import * as React from "react"

/*
  When listing complex-types from props, or props itself in a
  dependency array, it will usually always trigger unless externally
  memoized. Reasong being React depenndecy arrays compare by reference

  Below hook will memoize based on serialized string data.
  Todo: ignore property order
*/

export default function usePersistent<T>(data: T) {
  const serialized = JSON.stringify(data)

  const memoized = React.useMemo(() => {
    if (serialized) return <T>JSON.parse(serialized)
  }, [serialized])

  return memoized ?? data
}
