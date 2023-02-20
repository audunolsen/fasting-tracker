import { state } from "./state"

export function setOpen(
  this: string,
  next: boolean | ((prev: Boolean) => boolean)
) {
  const instance = state.instances[this]
  if (!instance) return

  instance.isOpen = typeof next == "function" ? next(instance.isOpen) : next
}
