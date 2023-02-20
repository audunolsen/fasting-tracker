/**
 * Type narrow element to desired HTMLElement
 *
 * Useful if not sure of element type and need proper typescript narrowing
 * before accessing desired dom-methods on element
 */
export default function isElement<T extends HTMLElement>(
  type: { new (): T },
  element: unknown
): element is T {
  return element instanceof type
}
