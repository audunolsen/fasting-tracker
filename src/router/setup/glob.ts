import { Module } from "~router/types"
import { routePathFromFile } from "./path"

/**
 * Collection of Promise-callbacks resolving route components.
 * They are later passed to React.lazy and then set as RouteObject's element prop
 */
const components = import.meta.glob<Module>("/src/pages/**/*page.tsx")

/**
 * Configs for each route. export named  `definePageConfig` to create
 * rect-router-dom's `RouteObject` config w/ reasonable defaults
 */
const configs = import.meta.glob<Module>("/src/pages/**/*page.tsx", {
  eager: true,
})

export { components, configs }

import.meta.hot?.send(
  "glob:routes",
  Object.keys(components)
    .map(routePathFromFile)
    .map((e) => e.path)
)
