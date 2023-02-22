import { definePageConfig } from "~router"

export default function NotNested() {
  return "SHOULD NOT BE NESTED"
}

export const config = definePageConfig({
  nested: false,
})
