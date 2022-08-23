import React, { useEffect } from 'react'
import './proseMirrorEditor.css'

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {DOMParser} from "prosemirror-model"
import listSchema from './proseMirrorConfig/schema'
import prosemirrorPlugins from './proseMirrorConfig/plugins'



export default function ProseMirrorEditor() {
  useEffect(() => {
    window.view = new EditorView(
      document.querySelector("#editor"), 
      {
        state: EditorState.create({
          doc: DOMParser.fromSchema(listSchema).parse(document.querySelector("#content")!), // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
          plugins: prosemirrorPlugins
        }),
        dispatchTransaction(transaction) {
          let newState = window.view.state.apply(transaction)
          console.log(newState.toJSON());
          window.view.updateState(newState)
        }
      },

    )
    
    return () => {
      console.log(window.view.state.toJSON());
    }
  })

  return (
    <>
      <div id='editor'></div>
      <div id='content'></div>
    </>
  )
}




  // Needs 
  // nodes: check boxes, tables, emojis, code boxes, link, blockquote
  // marks: highlighting, superscript, subscript

  // Input Rules Finished:
  // nodes: headings, ordered lists, unordered lists, images, horizonatal rules,
  // marks: bold, emphasised, strike through, 

  // Keymap Commands Finished:
  // nodes: 
  // marks: 

  // Tool bar when highlighting
  // extra stuff for extended notes page: footnotes, heading ids