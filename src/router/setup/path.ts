import { Segment } from "~router/types"

export function routePathFromFile(filePath: string) {
  const segments = filePathToSegments(filePath)

  return {
    path: pathFromSegments(segments) || "/",
    segments,
  }
}

export function pathFromSegments(segments: Segment[]) {
  return segments.filter((e) => typeof e === "string").join("/")
}

export function stringifySegments(segments: Segment[]) {
  return segments.map((segment) =>
    String(typeof segment === "symbol" ? segment.description : segment)
  )
}

function filePathToSegments(filePath: string) {
  const segments = replacers
    .path(filePath)
    .split("/")
    .filter(Boolean)
    .map((seg) => (seg.includes(".") ? seg.split(".").filter(Boolean) : seg))

  return formatSegments(segments)
}

function formatSegments(segments: (string[] | string)[]): Segment[] {
  return segments
    .map((e) => (Array.isArray(e) ? formatSegments(e).join("/") : e))
    .map(replacers.optional)
    .map(replacers.splat)
    .map(replacers.param)
    .map(replacers.pathlessGroup)
}

const replacers = {
  /**
   * Segment only has "@", i.e. is a splat route
   * `@` => `*`
   */
  splat: (seg) => seg.replace(/^@$/, "*"),

  /**
   * Segment starts w/ @ but has proceeding param name
   * `@user` => `:user`
   */
  param: (seg) => seg.replace(/^(?:@)(.+)/, ({}, match) => ":" + match),

  /**
   * Segment starts w/ "-" i.e. it is an optional segment
   * `-lang` => `lang?`
   */
  optional: (seg) => seg.replace(/(?:^-)(.+)/, ({}, match) => match + "?"),

  /**
   * File includes root page-dir and file extensions which should be omitted
   * `/src/pages/directory/nested/page.tsx` => directory/nested
   * `/src/pages/users.user.page.tsx` => users.user
   */
  path: (file) =>
    file.replace(/(?:^\/src\/pages\/)(.*)(?:\.?page\.tsx$)/, ({}, match) =>
      String(match).endsWith(".") ? match.slice(0, -1) : match
    ),

  /**
   * Wrap pathless layout groups in another datatype to make them easy
   * to distinguish and handle differently from regular path segments
   */
  pathlessGroup: (seg) => {
    const [, match] = seg.match(/^(?:\()(.+)(?:\))$/) ?? []
    return match ? Symbol(match) : seg
  },
} satisfies Record<string, (input: string) => Segment>
