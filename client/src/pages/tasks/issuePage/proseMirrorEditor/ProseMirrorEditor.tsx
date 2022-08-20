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
  // useEffect(() => {
  //   const view = new EditorView(
  //     document.querySelector("#editor"), 
  //     {
  //       state: EditorState.create({
  //         // doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
  //         schema,
  //         // plugins: exampleSetup({schema: mySchema})
  //         plugins: prosemirrorPlugins
  //       }),
  //       handleDoubleClick() { console.log("Double click!") }
  //     }
  //   )
  //   console.log(view.props);
  //   console.log(schema);

  //   return () => {
  //     view.destroy();
  //   }
  // })

  useEffect(() => {
    const editor = new EditorView(
      document.querySelector("#editor"),
      {
        state: EditorState.create({
          schema,
          plugins: exampleSetup({schema: mySchema})
        })
      }
    )
  })




  return (
    <>
      <div id='editor'></div>
      <div id='content'></div>
      <div>ProseMirrorEditor</div>
    </>
  )
}
