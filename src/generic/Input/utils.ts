import { Validity } from "./types"

const states = ["invalid", "external-error", "valid"] as const

type State = typeof states[number]

export function setCustomValidity(element: HTMLInputElement, type: State) {
  element.setCustomValidity(type === "valid" ? "" : type)
}

export function getCustomValidity() {
  // element.setCustomValidity(type === "valid" ? "" : type)
}

function getValidityState(el: HTMLInputElement, arr: true): (keyof Validity)[]
function getValidityState(el: HTMLInputElement, arr: false): Validity
function getValidityState(el: HTMLInputElement, arr = false) {
  const validity: Validity = {}

  for (let key in el.validity) {
    let valdityKey = key as keyof ValidityState
    validity[valdityKey] = el.validity[valdityKey]
  }

  const truthyKeys = Object.entries(validity)
    .filter(([, v]) => v)
    .map(([k]) => k) as (keyof Validity)[]

  return el ? truthyKeys : validity
}

export { getValidityState }
