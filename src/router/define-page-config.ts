import { Options } from "./types"

/**
 * Helper for creating route spesific config with reasonable defaults
 *
 * ROADMAP
 * handle auth here??
 */
export default function definePageConfig({
  auth = true,
  // nested = true,
  // errorElement = createElement(ErrorBoundry),

  ...rest
}: Options = {}) {
  // const config = {
  //   auth,
  //   nested,
  //   // path === null ? "" : "",
  //   ...rest,
  // } satisfies Options

  return {
    auth,
    // nested,
    // errorElement,
    ...rest,
  }
}
