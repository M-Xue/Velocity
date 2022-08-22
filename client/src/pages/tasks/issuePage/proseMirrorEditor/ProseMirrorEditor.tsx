import React, { useEffect } from 'react'
import './proseMirrorEditor.css'

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {addListNodes} from "prosemirror-schema-list"

import { schema } from './exampleConfig/schema-basic'
import { exampleSetup } from './exampleConfig'

export default function ProseMirrorEditor() {
  
  useEffect(() => {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })

    window.view = new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        // schema,
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")!), // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
        plugins: exampleSetup({schema: mySchema}) // This function returns a plugin
      }),
      // handleDoubleClick() {console.log(window.view.state.toJSON())}
      // dispatchTransaction(transaction) {
      //   console.log("Document size went from", transaction.before.content.size,
      //               "to", transaction.doc.content.size)
      //   let newState = window.view.state.apply(transaction) // If you dont apply the stranation and update the view state in the line below, the editor view will never update.
      //   window.view.updateState(newState)
      // }
    })

  })

  // Needs 
  // Headings, bold, emphasised, ordered lists, unordered lists, check boxes, code boxes, link, images, horizonatal rules, tables, strike through, highlighting, superscript, subscript, emojis
  // Tool bar when highlighting
  // footnotes, heading ids


  return (
    <>
      <div id='editor'></div>
      <div id='content'></div>
      <div>ProseMirrorEditor</div>
    </>
  )
}
