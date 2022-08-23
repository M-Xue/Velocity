import {keymap} from "prosemirror-keymap"
import {history} from "prosemirror-history"
import {baseKeymap} from "prosemirror-commands"
import {Plugin} from "prosemirror-state"
import {dropCursor} from "prosemirror-dropcursor"
import {gapCursor} from "prosemirror-gapcursor"
import {Schema} from "prosemirror-model"

import {buildKeymap} from "./keymap"
import {buildInputRules} from "./inputrules"

export {buildKeymap, buildInputRules} //! This line is not actually needed. These two functions are only used in this file.

/// Create an array of plugins pre-configured for the given schema.
/// The resulting array will include the following plugins:
///
///  * Input rules for smart quotes and creating the block types in the
///    schema using markdown conventions (say `"> "` to create a
///    blockquote)
/// 
///  * A keymap that defines keys to create and manipulate the nodes in the
///    schema
/// 
///  * A keymap binding the default keys provided by the
///    prosemirror-commands module
/// 
///  * The undo history plugin
/// 
///  * The drop cursor plugin
/// 
///  * The gap cursor plugin
/// 
///
/// Probably only useful for quickly setting up a passable
/// editor—you'll need more control over your settings in most
/// real-world situations.


// This function returns a plugin
export function exampleSetup(options: {
  /// The schema to generate key bindings and menu items for.
  schema: Schema

  /// Can be used to [adjust](#example-setup.buildKeymap) the key bindings created.
  mapKeys?: {[key: string]: string | false}

  /// Set to false to disable the history plugin.
  history?: boolean
}) {
  let plugins = [
    buildInputRules(options.schema), // returns the return value of inputRules() which returns a plugin
    keymap(buildKeymap(options.schema, options.mapKeys)), // buildKeymap() returns Commands. keymap() returns a plugin
    keymap(baseKeymap),
    dropCursor(),
    gapCursor()
  ]
  if (options.history !== false)
    plugins.push(history())

  return plugins.concat(new Plugin({
    props: {
      attributes: {class: "ProseMirror-example-setup-style"},
      // handleDoubleClick() {console.log(window.view.state.toJSON())} // Can add props here or directly into the editor view
    }
  }))
}