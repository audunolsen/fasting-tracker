/*
  Allows for internal value changes.
  This approach ensures that the component does not require
  opinionated usage as a controlled/uncontrolled input
  and is merely an extension of a native input.
*/

export function dispatchChangeEvent(
  input: HTMLInputElement | null,
  value: string
) {
  const proto = Object.getPrototypeOf(input)
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set

  if (!input || !setter || value == input.value) return

  setter.call(input, value)
  const event = new Event('input', { bubbles: true })
  input.dispatchEvent(event)
}
