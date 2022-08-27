import {MarkSpec} from "prosemirror-model"

// Explaination: Marks are used to add extra styling or other information to inline content. A schema must declare all mark types it allows in its schema. Mark types are objects much like node types, used to tag mark objects and provide additional information about them.
// The current object below in a simple object (not a mark) that holds many MarkSpecs (https://prosemirror.net/docs/ref/#model.MarkSpec)
// The toDOM() method specifies what kind of HTML tag should be wrapped arround any content with a particular mark.
// The parseDOM of the MarkSpec checks all coming content (dragged or pasted) for certain characteristics (e.g., their html tags or their CSS styling) and applies the toDOM() method.

/// [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {
  /// A link. Has `href` and `title` attributes. `title`
  /// defaults to the empty string. Rendered and parsed as an `<a>`
  /// element.
  link: {
    attrs: {
      href: {},
      title: {default: null}
    },
    inclusive: false,
    parseDOM: [{tag: "a[href]", getAttrs(dom: HTMLElement) {
      return {href: dom.getAttribute("href"), title: dom.getAttribute("title")}
    }}],
    toDOM(node) { let {href, title} = node.attrs; return ["a", {href, title}, 0] }
  } as MarkSpec,

  /// An emphasis mark. Rendered as an `<em>` element. Has parse rules
  /// that also match `<i>` and `font-style: italic`.
  em: {
    parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style", getAttrs: value => value == "italic" && null}],
    toDOM: () => ['em']
  } as MarkSpec,

  /// A strong mark. Rendered as `<strong>`, parse rules also match
  /// `<b>` and `font-weight: bold`.
  strong: {
    parseDOM: [{tag: "strong"},
               // This works around a Google Docs misbehavior where
               // pasted content will be inexplicably wrapped in `<b>`
               // tags with a font-weight normal.
               {tag: "b", getAttrs: (node: HTMLElement) => node.style.fontWeight != "normal" && null},
               {style: "font-weight", getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null}],
    toDOM: () => ['strong']
  } as MarkSpec,

  /// Code font mark. Represented as a `<code>` element.
  code: {
    parseDOM: [{tag: "code"}],
    toDOM: () => ['code']
  } as MarkSpec,

  // https://codesandbox.io/s/t3num?file=/src/Editor/marks.js:51-765
  subscript: {
    excludes: 'superscript',
    parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
    toDOM: () => ['sub']
  } as MarkSpec,

  superscript: {
    excludes: 'subscript',
    parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
    toDOM: () => ['sup']
  } as MarkSpec,

  strikethrough: {
    parseDOM: [
      { tag: 'strike' },
      { style: 'text-decoration=line-through' },
      { style: 'text-decoration-line=line-through' }
    ],
    toDOM: () => [
      'span',
      {
        style: 'text-decoration-line:line-through'
      }
    ]
  } as MarkSpec,

  underline: {
    parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
    toDOM: () => [
      'span',
      {
        style: 'text-decoration:underline'
      }
    ]
  } as MarkSpec,

  highlight: {
    parseDOM: [
        { tag: 'mark' }, 
        // { style: 'text-decoration=underline' }
    ],
    toDOM: () => [
      'span',
      {
        style: 'background-colour:#fcf8e3'
      }
    ]
  } as MarkSpec
}

export default marks;