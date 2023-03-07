import { ComponentType } from "react"
import { RouteObject } from "react-router-dom"

/**
 * Options which extend beyong React Router's RouteObject
 *
 */
export interface CustomRouteOptions {
  /**
   * Decision needed; should this prop redirect or
   * just not show own comp on missing auth?
   */
  auth?: boolean
}

/**
 * **omitted options**
 *
 * `path` is determined by file system
 *
 * `children` is determined by file system
 *
 * `element` is determined by default export of a page.tsx
 *
 * `caseSensitive` is seldom warranted
 * and ususally not accounted for in most frameworks' routers
 * https://github.com/vercel/next.js/discussions/15539
 */
type BaseOptions = Omit<
  RouteObject,
  "element" | "children" | "path" | "caseSensitive"
>

export type Options = BaseOptions & CustomRouteOptions
export type Auth = "awaiting" | boolean

/**
 * The type argument passed to vite's `import.meta.glob`
 *
 * `default` is the route component
 *
 * `config` is route config
 */
export type Module = { default: ComponentType; config: Options }

/**
 * Type which can be passed to react-router-dom directly,
 * but contains extra properties which may be utlised for
 * further parsing
 */
export type RouteData = (RouteObject & CustomRouteOptions) & {
  // Segment should probably be a common router util type
  segments: Segment[]
}

/**
 * `string` is a segment which is part of RR's `RouteObject.path`
 *
 * `Symbol` represents pathless layout group, and will result in
 * the omission of `RouteObject.path`. Such segments are wrapped in a different
 * primitive datatype to easily be distiguished and handled uniquely.
 */
export type Segment = string | Symbol
