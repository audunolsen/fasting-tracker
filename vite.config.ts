import { defineConfig, PluginOption } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import react from "@vitejs/plugin-react"
import tsPaths from "vite-tsconfig-paths"
import { writeFile } from "fs/promises"

export default defineConfig({
  plugins: [
    react(),
    tsPaths(),
    visualizer({ open: process.argv.at(-1) == "analyze" }),
    routeDefs(),
  ],
  css: {
    modules: {
      // https://vitejs.dev/config/#css-modules
      localsConvention: "dashesOnly",
    },
  },
})

function routeDefs(): PluginOption {
  return {
    name: "generate-route-definitions",
    configureServer(server) {
      server.ws.on("glob:routes", generateRouteDefs)
    },
  }
}

/**
 * NOTE: optional static segments should result in two paths;
 * one with and one without the optional segment
 */

async function generateRouteDefs(paths: string[]) {
  const comment = `
/** DEV SERVER BUILD ARTEFACT,
 * - Do not modify file
 * - Should be tracked by git
 */`.trim()
  // console.log("Generate routes…")

  const constAssertedRoutes = `export const routes = [\n${paths
    .map((path) => `"${path}"`)
    .join(",\n")}\n] as const`

  const plainRouteUnion = `export type PlainRoute = typeof routes[number]`

  const res = await writeFile(
    "src/router/generated/route-constants.ts",
    [comment, prettierIgnore(constAssertedRoutes), plainRouteUnion].join("\n\n")
  ).catch((e: Error) => e)

  if (res instanceof Error) {
    console.warn("Could not write route constants;", res.message)
  }
}

function prettierIgnore(node: string) {
  return ["// prettier-ignore", node].join("\n")
}
