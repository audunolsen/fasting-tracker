import createFlat from "~router/setup/create-flat"
import createTree from "~router/setup/create-tree"
import ProtectedRoute, { authConfig } from "~router/protected-route"
import { RouteObject } from "react-router-dom"
import { createElement } from "react"

const AuthWrapper: [RouteObject] = [
  {
    ...(authConfig as any),
    element: createElement(ProtectedRoute),
    children: createTree({ current: createFlat() }),
  },
]

export { AuthWrapper as routes }

/**
 * MISC THOUGHTS
 *
 * Omitting path from RouteObject creates a layout route that doesn't affect url-path
 * This could be useful for protected routes
 */
