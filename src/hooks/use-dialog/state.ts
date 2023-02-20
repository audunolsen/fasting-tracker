import { proxy } from "valtio"

export interface instanceState {
  isOpen: boolean
  index: number
}

export interface State {
  instances: Record<string, instanceState>
  lenght: number
}

export const state = proxy<State>({
  instances: {},

  get lenght() {
    let len = 0

    // for (const instance of Object.values(this.instances)) {
    //   if (instance.isOpen) len++
    // }

    return len

    // unkwnown wtf ???
    // return Object.values(this.instances).filter((e) => e.isOpen).length
  },
})
