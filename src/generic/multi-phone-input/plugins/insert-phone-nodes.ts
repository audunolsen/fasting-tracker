import * as React from "react"
import * as lexical from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import * as nodes from "../nodes"
import styles from "../styles.module.scss"

function handleTextNode(node: lexical.TextNode, editor: lexical.LexicalEditor) {
  const text = node.getTextContent()

  // split by whitespace or comma
  const parts = text.match(/[^\s,]+/g) ?? []
  const parent = node.getParent()
  const index = node.getIndexWithinParent()

  node.remove()

  const nd = parts
    .map((part) => [
      nodes.phonenumber.$createPhonenumberNode(styles.chip ?? "", part),
      nodes.spacer.$createSpacingNode(),
    ])
    .flat()

  parent?.splice(index, 0, nd)

  console.log("Oh shit!!")

  editor.update(() => {
    // const selection = lexical.$getSelection()
    // const last = nd.at(-1)
    // if (!lexical.$isRangeSelection(selection) || !last) return
    // selection.setTextNodeRange(last, 1, last, 1)
    // selection.setTextNodeRange()
    // selection.anchor.
    // const lol = lexical.
    // lexical.$
    // lexical.$setSelection
  })
}

export default function DisallowLineBraks() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    return editor.registerNodeTransform(lexical.TextNode, (node) =>
      handleTextNode(node, editor)
    )
  }, [editor])

  return null
}
