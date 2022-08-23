import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands";
import {dropCursor} from "prosemirror-dropcursor"
import {gapCursor} from "prosemirror-gapcursor"
import { buildInputRules } from "./inputrules";

import listSchema from "./schema";
import { buildKeymap } from "./keymap";

const prosemirrorPlugins = [
    history({
        depth: 100,
        newGroupDelay: 1
    }),
    keymap({"Mod-z": undo, "Mod-y": redo}),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    buildInputRules(listSchema),
    keymap(buildKeymap(listSchema))
]

export default prosemirrorPlugins;