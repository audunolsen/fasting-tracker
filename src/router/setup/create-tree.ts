import type { RouteData } from "~router/types"

type RecursionState = Partial<{
  current: RouteData[]
  original: RouteData[]
  level: number
  moved: number[]
}>

/**
 * Recursive function which transforms by MUTATION from flat routes to nested routes
 *
 * ROADMAP
 * - react router nested paths w/o direct descentant for each path entry
 * - split by auth wrapper. Should it only be top level??
 * - ✅ fix ts cast
 * - ✅ remove moved routes
 */
export default function mutateAsTree({
  current = [],
  original = current,
  level = 1,
  moved = [],
}: RecursionState = {}): RouteData[] {
  type Groups<F = RouteData[]> = [F, F, F]

  const [parents, allChildren, immediateChildren] = current.reduce<Groups>(
    (acc, entry) => {
      if (entry.segments.length === level) acc[0].push(entry)
      if (entry.segments.length > level) acc[1].push(entry)
      if (entry.segments.length === level + 1) acc[2].push(entry)

      return acc
    },
    [[], [], []]
  )

  for (const child of immediateChildren) {
    const i = level - 1
    const parent = parents.find((e) => child.segments[i] === e.segments[i])

    if (!parent) continue

    // moved.push here instead??
    moved.push(original.indexOf(child))

    /* LMAO this actually fixed problem of no route
      unless each sequential route segment has a corresponding RouteObject

      Please investigate further
    */

    parent.children?.push(child)
    parent.children ??= [child]
  }

  return allChildren.length
    ? mutateAsTree({ current: allChildren, level: ++level, original, moved })
    : deleteMovedRoutesOnFinish(original, moved)
}

function deleteMovedRoutesOnFinish(routes: RouteData[], indices: number[]) {
  routes.reduceRight(
    (...[, , i]) => (indices.includes(i) ? routes.splice(i, 1) : {}),
    {}
  )

  return routes
}
