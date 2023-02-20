/**
 * Asserts to TS-compiler that element is desired HTMLElement
 *
 * Useful when e.g. dealing w/ React events and asserting that `EventTarget`
 * is correct element so desired dom-methods can be accessed
 */
export default function assertElement<T extends HTMLElement>(
  type: { new (): T },
  element: unknown,
  error?: string | Error
): asserts element is T {
  if (element instanceof type) return

  if (error && typeof error === "string") {
    error = new Error(error)
  }

  throw error ?? new Error(`Could not assert element as ${type.name}`)
}
