import { createElement, lazy } from "react"
import finalizePath from "~router/finalize-path"
import { configs, components } from "~router/setup/glob"
import type { RouteData } from "~router/types"

/**
 * Returns flat route-structure.
 * Can be passed to react-router-dom as is.
 *
 * Contains some extra properties suitable for
 * further parsing; e.g. creating tree structure.
 */
export default function createFlat() {
  return Object.entries(components).reduce<RouteData[]>(
    (routes, [path, component]) => {
      const config = configs[path] ?? {}
      const finalizedPath = finalizePath(path, { splat: config.splat })

      return [
        ...routes,
        {
          path: finalizedPath.finalized,
          segments: finalizedPath.segments,

          element: createElement(lazy(component)),
          ...config,
        },
      ]
    },
    []
  )
}
