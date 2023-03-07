import type { RouteData } from "~router/types"
import { pathFromSegments, stringifySegments } from "./path"
import { routeList } from "./route-list"

function createTree(
  routes: RouteData[],
  level = 1,
  moved: number[] = []
): RouteData[] {
  const parents = routes.filter((e) => e.segments.length <= level)
  const children = routes.filter((e) => e.segments.length === level + 1)

  for (const child of children) {
    const parent = parents.find(
      (parent) =>
        stringifySegments(parent.segments).at(-1) ===
        stringifySegments(child.segments).at(-2)
    )

    if (!parent) continue

    const childPath = pathFromSegments(child.segments.slice(level))
    const isPathlessGroup = typeof child.segments.at(-1) === "symbol"

    if (childPath) child.path = childPath
    if (isPathlessGroup) delete child.path

    moved.push(routes.indexOf(child))
    parent.children?.push(child)
    parent.children ??= [child]
  }

  const next = routes.filter((e) => e.segments.length > level)

  return next.length
    ? createTree(routes, ++level, moved)
    : deleteMovedRoutesOnFinish(routes, moved)
}

function deleteMovedRoutesOnFinish(routes: RouteData[], indices: number[]) {
  routes.reduceRight(
    (...[, , i]) => (indices.includes(i) ? routes.splice(i, 1) : {}),
    {}
  )

  return routes
}

export const routeTree = createTree([...routeList])
