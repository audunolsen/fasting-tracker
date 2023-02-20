import * as React from "react"
import type { ComponentProps, ReactNode } from "react"
import { useSnapshot } from "valtio"
import { state } from "./state"

interface Props extends ComponentProps<"dialog"> {
  children?: ReactNode
  open?: never // Omit to prevent undesired native "non-modal" mode
}

export function Dialog(this: string, props: Props) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const snap = useSnapshot(state.instances)[this]

  React.useEffect(() => {
    const alreadyOpen = dialogRef.current?.hasAttribute("open")
    snap?.isOpen && !alreadyOpen && dialogRef.current?.showModal()
  }, [snap?.isOpen])

  const handleClose = () => {
    const instance = state.instances[this]
    if (!instance) return

    instance.isOpen = false
  }

  return (
    <dialog {...props} ref={dialogRef} onClose={handleClose}>
      <div>hello woooorld</div>
      <form>
        <button
          onClick={(e) => {
            e.preventDefault()
            // setCount((prev) => prev + 1)
            dialogRef.current?.close()
          }}
        >
          CLOSE
          {/* {count} */}
        </button>
      </form>
      {props.children}
    </dialog>
  )
}
