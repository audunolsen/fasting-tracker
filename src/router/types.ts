import { ComponentType } from "react"
import { RouteObject } from "react-router-dom"

export interface CustomRouteOptions {
  /**
   * Decision needed; should this prop redirect or
   * just not show own comp on missing auth?
   */
  auth?: boolean
  /**
   * Nested routes by default will render to parent outlet.
   * This renders correct path but buypasses outlet
   */
  nested?: boolean // or negative number for granular control?
  /**
   * Also known as `catch-all` or `star` segments.
   * All following route segments will be matched.
   *
   * Will only affect route if it is a dynamic segment
   */
  splat?: boolean
}

type BaseOptions = Omit<RouteObject, "element" | "children" | "path">
type Prettify<T> = { [K in keyof T]: T[K] } & {}

export type Options = Prettify<BaseOptions & CustomRouteOptions>
export type Auth = "awaiting" | boolean
export type Module = { default: ComponentType; config: Options }

/**
 * Type which can be passed to react-router-dom directly,
 * but contains extra properties which may be utlised for
 * further parsing
 */
export type RouteData = (RouteObject & CustomRouteOptions) & {
  segments: string[]
}
