import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import react from "@vitejs/plugin-react"
import tsPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    react(),
    tsPaths(),
    visualizer({ open: process.argv.at(-1) == "analyze" }),
  ],
  css: {
    modules: {
      // https://vitejs.dev/config/#css-modules
      localsConvention: "dashesOnly",
    },
  },
})
