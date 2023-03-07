import * as React from "react"
import * as Router from "react-router-dom"
import { ComponentProps } from "react"
import { RouteParams } from "../typed-route"
import type { PlainRoute } from "../generated/route-constants"

interface Props<R extends PlainRoute, P = RouteParams<R>>
  extends ComponentProps<typeof Router.Link> {
  to: R
  params: P
  // params: keyof P extends never ? true : P
}

export default function Link<R extends PlainRoute>({
  to,
  params,
  ...props
}: Props<R>) {
  const route: string = React.useMemo(() => {
    // TODO: fix path concat logic
    return ""
    // return Object.entries(params ?? {}).reduce(
    //   (path, [param, arg]) => {
    //     param = param === "splat" ? "*" : `:${param}`
    //     return path.replace(param, String(arg))
    //   },
    //   String(to)
    // )
  }, [to, params])

  return <Router.Link {...props} to={route} />
}

// function Render() {
//   return (
//     <>
//       <Link
//         to="/users/:user/friends/:friend"
//         params={{ user: "fhdjsk", friend: "hfjdks" }}
//         // params={{ user: "yolo", friend: "fds" }}
//         // params={}
//         // params={{ shit: "fhdjsk", user: "fjdsk", friend: "fuckface" }}
//       />

//       <Link to="/settings" params={{}} />
//     </>
//   )
// }
