import * as lexical from "lexical"
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  type EditorState,
  type EditorConfig,
} from "lexical"
import * as React from "react"
import type { ComponentProps } from "react"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import * as phonenumber from "libphonenumber-js"

import styles from "./styles.module.scss"
import { cn } from "~/utils"

import * as nodes from "./nodes"
import * as Plugins from "./plugins"
// import { $isPhonenumberNode } from "./nodes/phone"

const theme = {
  // Theme styling goes here
  // ...
}

/*
  Thoughts: when this is made a more generic chip component
  a prop is needed which either separates based on comma or space
*/

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot()
    const selection = $getSelection()

    // selection.

    if (!$isRangeSelection(selection)) return

    //  selection.anchor.set

    const caretNode = selection
      .getNodes()
      .find((e) => e.getKey() == selection.anchor.key)

    // caretNode?.set

    // if (nodes.phonenumber.$isPhonenumberNode(caretNode)) {
    //   caretNode.setTextContent("fuck")
    // }

    // console.log({ anchoredNode })
    // console.log(editorState.)
  })

  // editorState.
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error)
}

type InitialConfig = ComponentProps<typeof LexicalComposer>["initialConfig"]

const initialConfig: InitialConfig = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [
    nodes.phonenumber.PhonenumberNode,
    nodes.spacer.SpacingNode,
    // nodes.phoneElement.PhoneElementNode,
    // {
    //   replace: lexical.ParagraphNode,
    //   with: (node) => {
    //     return new nodes.phoneElement.PhoneElementNode()
    //   },
    // },
  ],
}

export default function Editor() {
  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <div className={cn(styles.inputWrapper)}>
          <PlainTextPlugin
            contentEditable={
              <ContentEditable
                className={cn("editor-input", styles.contentEditable)}
              />
            }
            placeholder={
              <div className={cn(styles.placeholder)}>Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <Plugins.DisallowLineBreaks />
        <Plugins.InsertPhoneNodes />
        {/* <Plugins.ParsePhoneNode /> */}
        <Plugins.RestrictCharacters />
        <Plugins.ParagraphTransform />
        <OnChangePlugin onChange={onChange} />
        {/* <HistoryPlugin />
      <MyCustomAutoFocusPlugin /> */}
      </LexicalComposer>
    </>
  )
}

// import { LexicalComposer } from "@lexical/react/LexicalComposer"
// import { PlainTextPlugin as PlainText } from "@lexical/react/LexicalPlainTextPlugin"
// import { ContentEditable } from "@lexical/react/LexicalContentEditable"
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
// import styles from "./styles.module.scss"
// import { cn } from "~/utils"

// import MentionsPlugin from "./plugins/MentionsPlugin"
// import { MentionNode } from "./nodes/MentionNode"
// import ExampleTheme from "./themes/ExampleTheme"

// function onError(error: unknown) {
//   console.error(error)
// }

// const initialConfig = {
//   namespace: "MyEditor",
//   // theme,
//   onError,
// }

// export default function Editor() {
//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <div className="editor-container">
//         <PlainText
//           ErrorBoundary={LexicalErrorBoundary}
//           contentEditable={
//             <ContentEditable className={cn("editor-input", styles.wrapper)} />
//           }
//           placeholder={<Placeholder />}
//         />

//         {/* <MentionsPlugin /> */}
//       </div>
//     </LexicalComposer>
//   )
// }

// function Placeholder() {
//   return (
//     <div className="editor-placeholder">
//       Play around with the mentions plugin...
//     </div>
//   )
// }

// import { $getRoot, $getSelection, type EditorState } from "lexical"
// import { useEffect } from "react"

// import { LexicalComposer } from "@lexical/react/LexicalComposer"
// import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
// import { ContentEditable } from "@lexical/react/LexicalContentEditable"
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"

// const theme = {
//   // Theme styling goes here
//   // ...
// }

// // When the editor changes, you can get notified via the
// // LexicalOnChangePlugin!
// function onChange(editorState: EditorState) {
//   editorState.read(() => {
//     // Read the contents of the EditorState here.
//     const root = $getRoot()
//     const selection = $getSelection()

//     console.log(root, selection)
//   })
// }

// // Lexical React plugins are React components, which makes them
// // highly composable. Furthermore, you can lazy load plugins if
// // desired, so you don't pay the cost for plugins until you
// // actually use them.
// function MyCustomAutoFocusPlugin() {
//   const [editor] = useLexicalComposerContext()

//   useEffect(() => {
//     // Focus the editor when the effect fires!
//     editor.focus()
//   }, [editor])

//   return null
// }

// // Catch any errors that occur during Lexical updates and log them
// // or throw them as needed. If you don't throw them, Lexical will
// // try to recover gracefully without losing user data.
// function onError(error: unknown) {
//   console.error(error)
// }

// export default function MultiPhoneInput() {
//   const initialConfig = {
//     namespace: "MyEditor",
//     theme,
//     onError,
//   }

//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <PlainTextPlugin
//         contentEditable={<ContentEditable />}
//         placeholder={<div>Enter some text...</div>}
//         ErrorBoundary={LexicalErrorBoundary}
//       />
//       <OnChangePlugin onChange={onChange} />
//       <HistoryPlugin />
//       <MyCustomAutoFocusPlugin />
//     </LexicalComposer>
//   )
// }
