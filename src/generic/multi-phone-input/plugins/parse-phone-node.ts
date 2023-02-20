import * as React from "react"
import * as lexical from "lexical"
import * as phonenumber from "libphonenumber-js"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import * as nodes from "../nodes"
import { parsePhoneNumberFromString as parseNumber } from "libphonenumber-js"
// import * as nodes from "../nodes/phone"

function handlePhoneNode(node: nodes.phonenumber.PhonenumberNode) {
  // if (nodes.phonenumber.$isPhonenumberNode(node)) {return}

  console.log("phone node change!!!", node.getKey())
  // console.log(node)

  // const parsed = parseNumber(node.getTextContent(), "NO")
  // if (parsed?.isValid()) {
  //   node.setTextContent(parsed.formatInternational())
  // }
}

export default function ParsePhoneNode() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    // return editor.registerNodeTransform(
    //   nodes.phonenumber.PhonenumberNode,
    //   handlePhoneNode
    // )
  }, [editor])

  return null
}
