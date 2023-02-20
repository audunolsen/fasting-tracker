import * as React from "react"
import type { ReactNode } from "react"

interface Props<T> {
  when?: T
  children: ReactNode | ((item: NonNullable<T>) => ReactNode)
  fallback?: ReactNode
}

export default function Show<T extends unknown>(props: Props<T>) {
  if (!!!props.when) return <>{props.fallback}</> ?? null

  const children =
    typeof props.children === "function"
      ? props.children(props.when)
      : props.children

  return <>{children}</>
}

// export function User(props: { data?: Data }) {
//   // pretend we have some local react state variables in scope
//   const isLoading = false
//   const isError = undefined

//   const isUser = (data?: Data | typeof NaN | 0): data is Data =>
//     (!isLoading || !isError) && !!data

//   const isUserNoPredicate = (data?: Data | typeof NaN | 0) =>
//     (!isLoading || !isError) && !!data

//   return (
//     <div>
//       {/* Compiles */}
//       {isUser(props.data) && <div>{props.data.user.name}</div>}

//       {/* Type error */}
//       {isUserNoPredicate(props.data) && <div>{props.data.user.name}</div>}
//     </div>
//   )
// }
