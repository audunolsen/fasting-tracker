import * as React from "react"
import { useSnapshot } from "valtio"
import { Dialog } from "./dialog"
import { state } from "./state"
import { setOpen } from "./utils"

// Track active dialog stack to provide ability for
// only one of them to style ::backdrop, avoiding progressively darker bg

export default function useDialog(defaultOpen?: boolean) {
  const instance = React.useId()

  state.instances[instance] ??= {
    isOpen: !!defaultOpen,
    index: 0,
  }

  const snap = useSnapshot(state.instances)[instance]

  return {
    Dialog: Dialog.bind(instance),
    isOpen: Boolean(snap?.isOpen),
    length: state.lenght,

    open: () => setOpen.call(instance, true),
    close: () => setOpen.call(instance, false),
    toggle: () => setOpen.call(instance, (prev) => !prev),
  }
}
