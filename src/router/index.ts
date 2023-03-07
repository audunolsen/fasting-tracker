import { routeTree } from "./setup/route-tree"
import { routeList } from "./setup/route-list"

// import ProtectedRoute, { authConfig } from "~router/protected-route"
// import type { RouteObject } from "react-router-dom"
// import { createElement } from "react"

console.log({ routeTree, routeList })

// const AuthWrapper: [RouteObject] = [
//   {
//     ...(authConfig as any),
//     element: createElement(ProtectedRoute),
//     children: routeTree,
//   },
// ]
// export { AuthWrapper as routes }

export { routeTree as routes }
export { default as definePageConfig } from "./define-page-config"
export { default as Link } from "./link"
export { default as route } from "./typed-route"
