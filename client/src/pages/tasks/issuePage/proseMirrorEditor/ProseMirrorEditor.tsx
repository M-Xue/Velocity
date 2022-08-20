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

    new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")!), // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
        plugins: exampleSetup({schema: mySchema})
      })
    })
  })




  return (
    <>
      <div id='editor'></div>
      <div id='content'></div>
      <div>ProseMirrorEditor</div>
    </>
  )
}
