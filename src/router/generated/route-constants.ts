/** DEV SERVER BUILD ARTEFACT,
 * - Do not modify file
 * - Should be tracked by git
 */

// prettier-ignore
export const routes = [
"/",
"wrapped/item?",
"articles/*",
"/",
"projects/*",
"projects/nested",
"projects",
"settings/danger-zone",
"settings",
"settings",
"users/:user/friends/:friend",
"users/:user/friends",
"users/:user",
"users"
] as const

export type PlainRoute = typeof routes[number]