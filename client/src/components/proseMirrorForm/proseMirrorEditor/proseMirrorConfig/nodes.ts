import {NodeSpec} from "prosemirror-model"

// Guide on NodeSpecs here in the Content Expression section: https://prosemirror.net/docs/guide/#schema
// Documentation: https://prosemirror.net/docs/ref/#model.NodeSpec


/// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
  /// NodeSpec The top level document node.
  doc: {
    content: "block+"
  } as NodeSpec,

  /// A plain paragraph textblock. Represented in the DOM
  /// as a `<p>` element.
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{tag: "p"}],
    toDOM() { return ["p", 0] }
  } as NodeSpec,

  /// A blockquote (`<blockquote>`) wrapping one or more blocks.
  blockquote: {
    content: "block+",
    group: "block",
    defining: true,
    parseDOM: [{tag: "blockquote"}],
    toDOM() { return ["blockquote", 0] }
  } as NodeSpec,

  /// A horizontal rule (`<hr>`).
  horizontal_rule: {
    group: "block",
    parseDOM: [{tag: "hr"}],
    toDOM() { return ["hr"] }
    // toDOM() { return ["div", ["hr"]] }
  } as NodeSpec,

  /// A heading textblock, with a `level` attribute that
  /// should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  /// `<h6>` elements.
  heading: {
    attrs: {level: {default: 1}},
    // content: "inline*",
    content: "(text | image)*",
    group: "block",
    defining: true,
    parseDOM: [{tag: "h1", attrs: {level: 1}},
               {tag: "h2", attrs: {level: 2}},
               {tag: "h3", attrs: {level: 3}},
               {tag: "h4", attrs: {level: 4}},
               {tag: "h5", attrs: {level: 5}},
               {tag: "h6", attrs: {level: 6}}],
    // toDOM(node) { return ["div", {style: "width=30px;background-colour=black"}, "h" + node.attrs.level, 0] }
    toDOM(node) { return ["h" + node.attrs.level, 0] }
  } as NodeSpec,

  /// A code listing. Disallows marks or non-text inline
  /// nodes by default. Represented as a `<pre>` element with a
  /// `<code>` element inside of it.
  code_block: {
    content: "text*",
    marks: "",
    group: "block",
    code: true,
    defining: true,
    parseDOM: [{tag: "pre", preserveWhitespace: "full"}],
    toDOM() { return ["pre", ["code", 0]] },
    // parseDOM: [{tag: "pre", preserveWhitespace: "full", getAttrs: node => (
    //     {params: (node as HTMLElement).getAttribute("data-params") || ""}
    //   )}],
    // toDOM(node) { return ["pre", node.attrs.params ? {"data-params": node.attrs.params} : {}, ["code", 0]] }
  } as NodeSpec,

  /// The text node.
  text: {
    group: "inline"
  } as NodeSpec,

  /// An inline image (`<img>`) node. Supports `src`,
  /// `alt`, and `href` attributes. The latter two default to the empty
  /// string.
  image: {
    inline: true,
    attrs: {
      src: {},
      alt: {default: null},
      title: {default: null}
    },
    group: "inline",
    draggable: true,
    parseDOM: [{tag: "img[src]", getAttrs(dom: HTMLElement) {
      return {
        src: dom.getAttribute("src"),
        title: dom.getAttribute("title"),
        alt: dom.getAttribute("alt")
      }
    }}],
    toDOM(node) { let {src, alt, title} = node.attrs; return ["img", {src, alt, title}] }
  } as NodeSpec,

  /// A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{tag: "br"}],
    toDOM() { return ["br"] }
  } as NodeSpec,

  ordered_list: {
    content: "list_item+",
    group: "block",
    attrs: {order: {default: 1}, tight: {default: false}},
    parseDOM: [{tag: "ol", getAttrs(dom) {
      return {order: (dom as HTMLElement).hasAttribute("start") ? +(dom as HTMLElement).getAttribute("start")! : 1,
              tight: (dom as HTMLElement).hasAttribute("data-tight")}
    }}],
    toDOM(node) {
      return ["ol", {start: node.attrs.order == 1 ? null : node.attrs.order,
                     "data-tight": node.attrs.tight ? "true" : null}, 0]
    }
  } as NodeSpec,

  bullet_list: {
    content: "list_item+",
    group: "block",
    attrs: {tight: {default: false}},
    parseDOM: [{tag: "ul", getAttrs: dom => ({tight: (dom as HTMLElement).hasAttribute("data-tight")})}],
    toDOM(node) { return ["ul", {"data-tight": node.attrs.tight ? "true" : null}, 0] }
  } as NodeSpec,

  list_item: {
    content: "paragraph block*",
    defining: true,
    parseDOM: [{tag: "li"}],
    toDOM() { return ["li", 0] }
  } as NodeSpec,



  check_list: {
    content: "list_item+",
    group: "block",
    toDOM(node) { return ["ul", {"data-tight": node.attrs.tight ? "true" : null}, 0] }
  } as NodeSpec,

  check_list_item: {
    content: "paragraph block*",
    defining: true,
    draggable: true,
    toDOM() { return ["div", {class: "prosemirror-checklist-item"}, "li", 0] }
  } as NodeSpec,
}

export default nodes;