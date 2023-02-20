import * as lexical from "lexical"
import button from "~generic/button"

import { parsePhoneNumberFromString as parseNumber } from "libphonenumber-js"

export class SpacingNode extends lexical.TextNode {
  static getType() {
    return "spacer"
  }

  static clone(node: SpacingNode) {
    return new SpacingNode()
  }

  constructor() {
    super("–")
  }

  createDOM(config: lexical.EditorConfig) {
    console.log("CREATE")

    const dom = super.createDOM(config)
    // dom.className = this.__className

    return dom
  }
}

export function $isSpacingNode(node: unknown): node is SpacingNode {
  return node instanceof SpacingNode
}

export function $createSpacingNode() {
  return new SpacingNode().setMode("token")
}
