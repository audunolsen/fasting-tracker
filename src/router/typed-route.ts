import type { PlainRoute } from "./generated/route-constants"
import type * as H from "hotscript"
import type * as Utils from "~types/utils"

export type RouteParams<Route extends string> = H.Pipe<
  Route,
  [
    H.Strings.Split<"/">,
    H.Tuples.Filter<H.Strings.StartsWith<":" | "*">>,
    H.Tuples.Map<H.ComposeLeft<[H.Strings.Trim<":">, SetKeyValue]>>,
    H.Tuples.ToUnion,
    H.Objects.FromEntries,
    FinalizeParams
  ]
>

interface SetKeyValue extends H.Fn {
  isSplat: H.Call<H.Strings.EndsWith<"?">, this["arg0"]>

  return: this["isSplat"] extends true
    ? [H.Call<H.Strings.TrimRight<"?">, this["arg0"]>, string | undefined]
    : [H.Call<ReplaceAsterisk, this["arg0"]>, string]
}

interface ReplaceAsterisk extends H.Fn {
  return: H.Call<H.Booleans.Equals<"*">, this["arg0"]> extends true
    ? "splat"
    : this["arg0"]
}

interface FinalizeParams extends H.Fn {
  return: Utils.Flatten<Utils.MakeOptional<this["arg0"]>>
}

interface RouteFn {
  <
    Route extends PlainRoute,
    Params = RouteParams<Route>,
    /** `true` if there are no route arguments */
    DissalowParams = Utils.IsEmpty<Params>,
    /** `true` if there are any *required* route arguments */
    RequireParams = Utils.HasKeys<Utils.RequiredFields<Params>>
  >(
    route: Route,
    ...params: DissalowParams extends true
      ? [never?]
      : RequireParams extends true
      ? [RouteParams<Route>]
      : [RouteParams<Route>?]
  ): string
}

/** Route function which infers route-parameters based on the argument */
const route: RouteFn = (route, ...params) =>
  Object.entries(params[0] ?? {}).reduce(
    // Remember normalize path!!!
    // eg passing undefined to optional segment
    (path, [param, arg]) => {
      param = param === "splat" ? "*" : `:${param}`

      return path.replace(`:${param}`, String(arg))
    },
    String(route)
  )

export default route

route("users/:user/friends/:friend", {
  user: "dfsfs",
  friend: "fhdsk",
})

route("users")

// route("plants/:lang?/categories", {
//   lang: "NO",
// })

// route("plants/:lang?/categories")

route("projects/*", { splat: "fdsfsd" })
