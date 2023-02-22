import { Module } from "~router/types"

/**
 * Collection of Promise-callbacks resolving route components.
 * They are later passed to React.lazy and then set as RouteObject's element prop
 *
 * ROADMAP
 * - `#eager` filename flag (lazyload by default)
 */
const components = import.meta.glob<Module>("/src/pages/**/*page.tsx")

/**
 * Configs for each route-entry. Use `definePageConfig` to create
 * rect-router-dom's `RouteObject` config w/ reasonable defaults
 *
 * Defaults to emtpy `definePageConfig()` call
 */
const configs = import.meta.glob<Module>("/src/pages/**/*page.tsx", {
  eager: true,
})

export { components, configs }
