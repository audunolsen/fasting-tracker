import { createElement, lazy } from "react"
import { definePageConfig } from "~router"
import { RouteData } from "~router/types"
import finalizePath from "./finalize-path"
import { components, configs } from "./glob"

export const routeList = Object.entries(components).reduce<RouteData[]>(
  (routes, [path, component]) => {
    const config = configs[path]?.config ?? definePageConfig()
    const finalizedPath = finalizePath(path, { splat: config.splat })

    // console.log(path, finalizedPath)

    return routes.concat([
      {
        path: finalizedPath.finalized,
        segments: finalizedPath.segments,
        element: createElement(lazy(component)),
        ...config,
      },
    ])
  },
  []
)
