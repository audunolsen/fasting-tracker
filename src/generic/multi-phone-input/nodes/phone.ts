import * as lexical from "lexical"
import button from "~generic/button"

import { parsePhoneNumberFromString as parseNumber } from "libphonenumber-js"

export class PhonenumberNode extends lexical.TextNode {
  __className = ""

  static getType() {
    return "phonenumber"
  }

  static clone(node: PhonenumberNode) {
    return new PhonenumberNode(node.__className, node.__text, node.__key)
  }

  constructor(
    className: string,
    ...rest: ConstructorParameters<typeof lexical.TextNode>
  ) {
    super(...rest)
    this.__className = className
  }

  createDOM(config: lexical.EditorConfig) {
    // const btn = document.createElement("button")
    // btn.innerText = "X"

    // btn.addEventListener("click", () => this.remove())

    console.log("CREATE")

    const dom = super.createDOM(config)
    dom.className = this.__className
    // dom.dataset.countryCode = "NO"
    // // dom.appendChild(btn)
    // return dom

    const text = this.getTextContent()
    console.log({ text })
    const parsed = parseNumber(text, "NO")
    // const isValid = parsed?.isValid()
    // if (!parsed?.isValid()) return true

    // const formatted = parsed.format("INTERNATIONAL")
    // const frag = document.createDocumentFragment()

    // for (const part of formatted.split(" ")) {
    //   const span = document.createElement("span")
    //   // span.style.marginRight = "5px"
    //   span.textContent = part
    //   frag.append(span)
    // }

    // dom.replaceChildren(frag)
    // if (parsed?.isValid()) {
    //   const frag = document.createDocumentFragment()
    //   const formatted = parsed.format("INTERNATIONAL")

    //   for (const part of formatted.split(" ")) {
    //     const span = document.createElement("span")
    //     // span.style.marginRight = "5px"
    //     span.textContent = part
    //     frag.append(span)
    //   }

    //   dom.replaceChildren(frag)
    // }

    return dom
  }

  // updateDOM(
  //   prevNode: typeof this,
  //   dom: HTMLElement,
  //   config: lexical.EditorConfig
  // ) {
  //   // console.log("UPDATE")
  //   // const text = prevNode.getTextContent()
  //   // const parsed = parseNumber(text, "NO")
  //   // if (!parsed?.isValid()) return true
  //   // const formatted = parsed.format("INTERNATIONAL")
  //   // const frag = document.createDocumentFragment()
  //   // for (const part of formatted.split(" ")) {
  //   //   const span = document.createElement("span")
  //   //   // span.style.marginRight = "5px"
  //   //   span.textContent = part
  //   //   frag.append(span)
  //   // }
  //   // dom.replaceChildren(frag)
  //   // console.log("Got here!?")
  //   // // console.log({ lol })
  //   // // node.setTextContent(text + "U")
  //   // // console.log(, $isPhonenumberNode(node))
  //   // // dom.style.border = "2px solid pink"
  //   // const text = prevNode.getTextContent()
  //   // const parsed = parseNumber(text, "NO")
  //   // if (!parsed?.isValid())
  //   // return !!parsed?.isValid()
  //   // const formatted = parsed.format("INTERNATIONAL")
  //   // return true
  // }
}

export function $isPhonenumberNode(node: unknown): node is PhonenumberNode {
  return node instanceof PhonenumberNode
}

export function $createPhonenumberNode(
  className: string,
  emoticonText: string
) {
  return new PhonenumberNode(className, emoticonText).setMode("normal")
  // .setMode("token")
}
