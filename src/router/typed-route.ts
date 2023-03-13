import type { PlainRoute } from "./generated/route-constants"
import type * as H from "hotscript"
import type * as Utils from "~types/utils"

export type RouteParams<Route extends string> = H.Pipe<
  Route,
  [
    H.Strings.Split<"/">,
    H.Tuples.Filter<RequiresArg>,
    H.Tuples.Map<SetKeyValue>,
    H.Tuples.ToUnion,
    H.Objects.FromEntries,
    FinalizeParams
  ]
>

interface RequiresArg extends H.Fn {
  dynamic: H.Call<H.Strings.StartsWith<":" | "*">, this["arg0"]>
  optional: H.Call<H.Strings.EndsWith<"?">, this["arg0"]>

  return: H.Eval<H.Booleans.Or<this["dynamic"], this["optional"]>>
}

interface SetKeyValue extends H.Fn {
  isDynamic: H.Call<H.Strings.StartsWith<":" | "*">, this["arg0"]>
  isOptional: H.Call<H.Strings.EndsWith<"?">, this["arg0"]>
  isStatic: H.Eval<H.Booleans.Not<this["isDynamic"]>>
  key: H.Call<ReplaceKey, this["arg0"]>

  optionalValue: this["isStatic"] extends true
    ? null | undefined
    : string | undefined

  return: this["isOptional"] extends true
    ? [this["key"], this["optionalValue"]]
    : [this["key"], string]
}

interface ReplaceKey extends H.Fn {
  splat: H.Eval<H.Booleans.Equals<this["arg0"], "*">>

  trimmed: H.Pipe<
    this["arg0"],
    [H.Strings.TrimLeft<":">, H.Strings.TrimRight<"?">]
  >

  return: this["splat"] extends true ? "splat" : this["trimmed"]
}

interface FinalizeParams extends H.Fn {
  return: Utils.Flatten<Utils.MakeOptional<this["arg0"]>>
}

function route<Route extends PlainRoute>(
  route: Route,
  ...params: Utils.OptionalIfEmpty<RouteParams<Route>>
) {
  const fallbackParams = Object.fromEntries(
    route
      .split("/")
      .filter((e) => e.endsWith("?"))
      .map((k) => [k.slice(k.startsWith(":") ? 1 : 0, -1), ""])
  )

  const allParams: Record<string, string | undefined | null> = {
    ...fallbackParams,
    ...params[0],
  }

  return (
    Object.entries(allParams)
      .reduce(pathReducer, route)
      .replace(/(.*)(\/$)/, "$1") || "/"
  )
}

function pathReducer(
  path: string,
  [param, arg]: [string, string | undefined | null]
) {
  const isSplat = param === "splat"
  const matcher = new RegExp(
    `(?<isDynamic>:?)\\b${param}\\b(?<isOptional>\\??)`
  )

  return path.replace(isSplat ? "*" : matcher, (...args) => {
    const { isDynamic, isOptional } = <Record<string, string>>args.at(-1)
    let substitute: string = arg ?? ""

    if (!isDynamic && isOptional) {
      substitute = arg === null ? "" : param
    }

    return substitute
  })
}

export default route
