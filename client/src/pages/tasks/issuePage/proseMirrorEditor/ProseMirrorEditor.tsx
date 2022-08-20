import React, { useEffect } from 'react'
import './proseMirrorEditor.css'

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"


import {Schema, DOMParser} from "prosemirror-model"

import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

import mySchema from './proseMirrorConfig/schema'
import prosemirrorPlugins from './proseMirrorConfig/plugins'


export default function ProseMirrorEditor() {
  useEffect(() => {
    const editor = new EditorView(
      document.querySelector("#editor"), 
      {
        state: EditorState.create({
          doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
          plugins: exampleSetup({schema: mySchema})
        })
      }
    )
    console.log(mySchema);
  })

  
  
  
  return (
    <>
      <div id='editor'></div>
      <div id='content'></div>
      <div>ProseMirrorEditor</div>
    </>
  )
}
