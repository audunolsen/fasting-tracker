/**
 * Creates a path understood by React Router Dom.
 * Removes start of absolute path and trims extension
 *
 * Substitutes `@` for `:` as the latter is a reserved character in file-names per
 * https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
 *
 * `@` follows the convention in vite-plugin-srr. Other common naming-conventions
 * are `[id]` utilised by astro & next.
 *
 * ROADMAP
 * - ✅ Catch-all routes.
 * react-router-dom utilises `*`. Next, Astro, solid-start and the like utilises [...slug].
 * vite-plugin-ssr allows for setting this in the per route config
 * I'm leaning towards the latter as there's less filename fuckery
 *
 * - Optional segments (/:lang?/categories) dynamic and static.
 * Maybe thats only achievable w [] syntax ?, e.g. "[lang?]categories.page.tsx"
 *
 * - ✅ Optional `index` in path for marking the default page of directory.
 * Because the glob pattern matches `.?page`, this renders index redundant as page.tsx is sufficient
 */
export default function finalizePath(
  raw: string,
  opts: { splat?: boolean; optional?: boolean } = {}
) {
  /** uniquely handled path segments */
  const reserved = ["index"]

  const segments = raw
    .replace(/^(\/src\/pages\/)/, "")
    .replace(/\.?page\.tsx$/, "")
    .replaceAll("@", ":")
    .split("/")
    .filter(Boolean)
    .filter((e) => !reserved.includes(e))

  if (opts.splat && segments.at(-1)?.startsWith(":"))
    segments[segments.length - 1] = "*"

  return {
    finalized: `/${segments.join("/")}`,
    segments: segments,
    segment: segments.at(-1),
  }
}
