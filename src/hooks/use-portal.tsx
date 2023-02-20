// import { createPortal } from "react-dom"
import * as React from "react"
import { proxy, useSnapshot } from "valtio"
import type { ReactNode } from "react"

interface State {
  isOpen: boolean
  mount: string
}

interface Props {
  children: ReactNode
}

const state = proxy<Record<string, State>>()

function Portal(this: string, props: Props) {
  const snap = useSnapshot(state)[this]

  if (!snap?.isOpen) return null

  return <div>{props.children}</div>
}

interface Opts {
  mount?: ""
  defaultOpen?: boolean
}

export default function usePortal(opts: Opts = {}) {
  const id = React.useId()

  state[id] ??= {
    isOpen: !!opts.defaultOpen,
    mount: opts.mount ?? "",
  }

  const snap = useSnapshot(state)[id]

  // Todo: cleanup

  return {
    Portal: Portal.bind(id),
    isOpen: snap?.isOpen,

    open: () => setOpen.call(id, true),
    close: () => setOpen.call(id, false),
    toggle: () => setOpen.call(id, (prev) => !prev),
  }
}

function setOpen(this: string, next: boolean | ((prev: Boolean) => boolean)) {
  const instance = state[this]
  if (!instance) return

  instance.isOpen = typeof next == "function" ? next(instance.isOpen) : next
}
