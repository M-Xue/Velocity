import {inputRules, wrappingInputRule, textblockTypeInputRule,
    smartQuotes, emDash, ellipsis, InputRule} from "prosemirror-inputrules"
import {MarkType, NodeType, Schema} from "prosemirror-model"

/// Given a blockquote node type, returns an input rule that turns `"> "`
/// at the start of a textblock into a blockquote.
export function blockQuoteRule(nodeType: NodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType)
}

/// Given a list node type, returns an input rule that turns a number
/// followed by a dot at the start of a textblock into an ordered list.
export function orderedListRule(nodeType: NodeType) {
    return wrappingInputRule(/^(\d+)\.\s$/, nodeType, match => ({order: +match[1]}), (match, node) => node.childCount + node.attrs.order == +match[1])
}

/// Given a list node type, returns an input rule that turns a bullet
/// (dash, plus, or asterisk) at the start of a textblock into a
/// bullet list.
export function bulletListRule(nodeType: NodeType) {
    return wrappingInputRule(/^\s*([-+*])\s$/, nodeType)
}

/// Given a code block node type, returns an input rule that turns a
/// textblock starting with three backticks into a code block.
export function codeBlockRule(nodeType: NodeType) {
    return textblockTypeInputRule(/^```$/, nodeType)
}

/// Given a node type and a maximum level, creates an input rule that
/// turns up to that number of `#` characters followed by a space at
/// the start of a textblock into a heading whose level corresponds to
/// the number of `#` signs.
export function headingRule(nodeType: NodeType, maxLevel: number) {
    return textblockTypeInputRule(new RegExp("^(#{1," + maxLevel + "})\\s$"), nodeType, match => ({level: match[1].length}))
}




function markInputRule(regexp: RegExp, markType: MarkType, getAttrs: any) {
    return new InputRule(regexp, (state, match, start, end) => {
        let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs
        let tr = state.tr
        if (match[1]) {
            let textStart = start + match[0].indexOf(match[1])
            let textEnd = textStart + match[1].length
            if (textEnd < end) tr.delete(textEnd, end)
            if (textStart > start) tr.delete(start, textStart)
            end = start + match[1].length
        }
        tr.addMark(start, end, markType.create(attrs))
        tr.removeStoredMark(markType) // Do not continue with mark.
        return tr
    })
}


/// A set of input rules for creating the basic block quotes, lists,
/// code blocks, and heading.
export function buildInputRules(schema: Schema) {
    let rules = smartQuotes.concat(ellipsis, emDash);
    rules.push(blockQuoteRule(schema.nodes.blockquote));
    rules.push(orderedListRule(schema.nodes.ordered_list));
    rules.push(bulletListRule(schema.nodes.bullet_list));
    rules.push(codeBlockRule(schema.nodes.code_block));
    rules.push(headingRule(schema.nodes.heading, 6));

    rules.push(markInputRule(/(?:\*\*|__)([^\*_]+)(?:\*\*|__)$/, schema.marks.strong, null));
    rules.push(markInputRule(/(?:^|[^\*_])(?:\*|_)([^\*_]+)(?:\*|_)$/, schema.marks.em, null));
    rules.push(markInputRule(/(?:~~)([^]+)(?:~~)$/, schema.marks.strikethrough, null))
    // rules.push(markInputRule(/[^~~](?:~)([^]+)(?:~)$/, schema.marks.subscript, null))
    // rules.push(markInputRule(/(?:~)([^]+)(?:~)$/, schema.marks.subscript, null))

    return inputRules({rules})
}
