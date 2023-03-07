import { createElement, lazy } from "react"
import { definePageConfig } from "~router"
import { RouteData } from "~router/types"
import { routePathFromFile } from "./path"
import { components, configs } from "./glob"

export const routeList = Object.entries(components).reduce<RouteData[]>(
  (routes, [file, component]) => {
    const config = configs[file]?.config ?? definePageConfig()
    const { path, segments } = routePathFromFile(file)

    const isRootPathlessGroup =
      typeof segments[0] === "symbol" && segments.length === 1

    return routes.concat([
      {
        segments,
        element: createElement(lazy(component)),
        ...(!isRootPathlessGroup && { path }),
        ...config,
      },
    ])
  },
  []
)
