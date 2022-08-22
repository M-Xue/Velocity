import {Schema} from "prosemirror-model"
import {addListNodes} from "prosemirror-schema-list"
import marks from "./marks";
import nodes from "./nodes";

const schema: Schema = new Schema({
  nodes: nodes,
  marks: marks
});

const listSchema: Schema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
});

export default listSchema;