import { routeTree } from "./setup/route-tree"
import { routeList } from "./setup/route-list"

import ProtectedRoute, { authConfig } from "~router/protected-route"
import type { RouteObject } from "react-router-dom"
import { createElement } from "react"

console.log({ routeTree, routeList })

const AuthWrapper: [RouteObject] = [
  {
    ...(authConfig as any),
    element: createElement(ProtectedRoute),
    children: routeTree,
  },
]

export { AuthWrapper as routes }
export { default as definePageConfig } from "./define-page-config"

/**
 * MISC THOUGHTS
 *
 * Omitting path from RouteObject creates a layout route that doesn't affect url-path
 * This could be useful for protected routes
 */
