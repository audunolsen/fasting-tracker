import type { RouteData } from "~router/types"
import { routeList } from "./route-list"

type RecursionState = Partial<{
  routes: RouteData[]
  level: number
  moved: number[]
}>

/**
 * Recursive function which mutates initial arg from flat routes to nested routes
 *
 * ROADMAP
 * - account for non nested routes
 * - ✅ nested paths w/o direct descentant for each path entry (fixed by findParent)
 * - ✅ remove moved routes
 */
function createTree({
  routes = [],
  level = 1,
  moved = [],
}: RecursionState = {}): RouteData[] {
  const parents = routes.filter((e) => e.segments.length <= level)
  const children = routes.filter((e) => e.segments.length === level + 1)

  for (const child of children) {
    const parent = findParent(child, parents)

    if (!parent) continue

    moved.push(routes.indexOf(child))
    parent.children?.push(child)
    parent.children ??= [child]
  }

  const next = routes.filter((e) => e.segments.length > level)

  return next.length
    ? createTree({ routes, level: ++level, moved })
    : deleteMovedRoutesOnFinish(routes, moved)
}

/**
 * Deletes any previous top level routes which have
 * been moved once recursion is complete
 *
 * Takes a set of deletion indices and iterates backwards while removing them
 * with splice. This is to avoid problematic index shifitng during sequential splicing
 */
function deleteMovedRoutesOnFinish(routes: RouteData[], indices: number[]) {
  routes.reduceRight(
    (...[, , i]) => (indices.includes(i) ? routes.splice(i, 1) : {}),
    {}
  )

  return routes
}

/**
 * Finds parent route if any.
 *
 * Iterates through each path-segment backwards
 * to also find non immdiate parent-routes
 */
function findParent(route: RouteData, parents: RouteData[]) {
  for (const segment of route.segments.slice(0, 1).reverse()) {
    const parent = parents.find((e) => segment === e.segments.at(-1))
    if (parent) return parent
  }
}

export const routeTree = createTree({ routes: [...routeList] })
