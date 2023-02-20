import * as React from "react"
import * as lexical from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export default function DisallowLineBraks() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    // return editor.registerNodeTransform(
    //   lexical.ParagraphNode,
    //   lineBreakNodeTransform
    // )
  }, [editor])

  return null
}

function lineBreakNodeTransform(node: lexical.ParagraphNode) {
  // node.splice()
  // node.remove()
}
