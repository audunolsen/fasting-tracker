import * as lexical from "lexical"

export class PhoneElementNode extends lexical.ParagraphNode {
  static getType(): string {
    return "phone-paragraph"
  }

  isInline(): boolean {
    return true
  }

  static clone(node: PhoneElementNode): PhoneElementNode {
    return new PhoneElementNode(node.__key)
  }

  // static clone(node: lexical.ParagraphNode): lexical.ParagraphNode {
  //   return new PhoneElement(node.__key)
  // }

  // createDOM(): HTMLElement {
  //   // Define the DOM element here
  //   const dom = document.createElement("p")
  //   return dom
  // }

  // updateDOM(
  //   _prevNode: lexical.ParagraphNode,
  //   _dom: HTMLElement,
  //   _config: lexical.EditorConfig
  // ): boolean {
  //   return true
  // }
}
