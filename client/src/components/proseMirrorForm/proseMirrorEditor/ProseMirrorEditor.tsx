import React, { useEffect, useLayoutEffect } from 'react'
import './proseMirrorEditor.css'

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {DOMParser} from "prosemirror-model"
import listSchema from './proseMirrorConfig/schema'
import prosemirrorPlugins from './proseMirrorConfig/plugins'


export default function ProseMirrorEditor() {

  useLayoutEffect(() => {
    const fetchJSONData = async () => {
      const response = await fetch("./testContent.json");
      const json = await response.json();
      let initialState;
      if (json !== null && json !== undefined) {
        initialState = EditorState.fromJSON(
          {
            schema: listSchema,
            plugins: prosemirrorPlugins
          },
          json
        )
      } else {
        initialState = EditorState.create({
          doc: DOMParser.fromSchema(listSchema).parse(document.querySelector("#content")!), // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
          plugins: prosemirrorPlugins
        })
      }

      window.view = new EditorView(
        document.querySelector("#editor"), 
        {
          state: initialState,
          dispatchTransaction(transaction) {
            let newState = window.view.state.apply(transaction)

            // TODO Update the editor description here

            console.log(newState.toJSON());
            window.view.updateState(newState)
          }
        }
      )
    }
    fetchJSONData().catch(console.error);




  }, [])

  

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















































// * Original: creates fresh new editor /////////////////////////////////////////////////
// window.view = new EditorView(
//   document.querySelector("#editor"), 
//   {
//     state: EditorState.create({
//       doc: DOMParser.fromSchema(listSchema).parse(document.querySelector("#content")!), // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
//       plugins: prosemirrorPlugins
//     }),
//     dispatchTransaction(transaction) {
//       let newState = window.view.state.apply(transaction)

//       // TODO Update the editor description here

//       console.log(newState.toJSON());
//       window.view.updateState(newState)
//     }
//   }
// ) 




// * Fetching prewritten editor state from local test file in public folder /////////////

    // const fetchJSONData = async () => {
    //   const response = await fetch("./testContent.json");
    //   const json = await response.json();
    //   if (response !== null && response !== undefined) {
    //     window.view = new EditorView(
    //       document.querySelector("#editor"), 
    //       {
    //         state: EditorState.fromJSON(
    //           {
    //             schema: listSchema,
    //             plugins: prosemirrorPlugins
    //           },
    //           json
    //         )
    //       }
    //     )
    //   } else {

    //   }
    // }
    // fetchJSONData();



// * Tries to fetch preexisting editor state but creates new one if non existant //////////////////
    // const fetchJSONData = async () => {
    //   const response = await fetch("./testContent.json");
    //   const json = await response.json();
    //   let initialState;
    //   if (json !== null && json !== undefined) {
    //     initialState = EditorState.fromJSON(
    //       {
    //         schema: listSchema,
    //         plugins: prosemirrorPlugins
    //       },
    //       json
    //     )
    //   } else {
    //     initialState = EditorState.create({
    //       doc: DOMParser.fromSchema(listSchema).parse(document.querySelector("#content")!), // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
    //       plugins: prosemirrorPlugins
    //     })
    //   }

    //   window.view = new EditorView(
    //     document.querySelector("#editor"), 
    //     {
    //       state: initialState,
    //       dispatchTransaction(transaction) {
    //         let newState = window.view.state.apply(transaction)

    //         // TODO Update the editor description here

    //         console.log(newState.toJSON());
    //         window.view.updateState(newState)
    //       }
    //     }
    //   )

    // }
    // fetchJSONData();