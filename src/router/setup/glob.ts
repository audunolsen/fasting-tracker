import { Module, Options } from "~router/types"

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
 * This glob makes exporting Config required. (Is this level of explicitness wanted?)
 */
const configs = import.meta.glob<Options>("/src/pages/**/*page.tsx", {
  import: "config",
  eager: true,
})

export { components, configs }
