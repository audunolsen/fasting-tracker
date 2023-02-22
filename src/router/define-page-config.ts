import ErrorBoundry from "~pages/error-boundry"
import { Options } from "./types"
import { createElement } from "react"

/**
 * Helper for creating route spesific config with reasonable defaults
 *
 * ROADMAP
 * handle auth here??
 */
export default function definePageConfig({
  auth = true,
  nested = true,
  // errorElement = createElement(ErrorBoundry),

  ...rest
}: Options = {}) {
  return {
    auth,
    nested,
    // errorElement,
    ...rest,
  }
}
