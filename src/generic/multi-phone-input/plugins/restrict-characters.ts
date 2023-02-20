import * as React from "react"
import * as lexical from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export default function RestrictCharacters() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    // return editor.registerNodeTransform(
    //   lexical.TextNode,
    //   lineBreakNodeTransform
    // )
    // return registerLexicalTextEntity<N: TextNode>(
    //   editor: LexicalEditor,
    //   getMatch: (text: string) => null | EntityMatch,
    //   targetNode: Class<N>,
    //   createNode: (textNode: TextNode) => N,
    // ): Array<() => void>;
    // const unsub = editor.
  }, [editor])

  return null
}

function lineBreakNodeTransform(node: lexical.TextNode) {
  console.log("Whaddup!!!!!!!")
  // node.remove()
}
