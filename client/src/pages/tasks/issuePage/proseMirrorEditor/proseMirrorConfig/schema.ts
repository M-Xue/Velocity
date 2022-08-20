import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"

import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

console.log(addListNodes(schema.spec.nodes, "paragraph block*", "block"));
console.log(schema.spec.marks);

export default new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    // nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"), 
    marks: schema.spec.marks
    // marks: schema.spec.marks
  });