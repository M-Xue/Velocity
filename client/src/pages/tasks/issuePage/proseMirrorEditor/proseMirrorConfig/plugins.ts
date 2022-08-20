import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands";

const prosemirrorPlugins = [
    history({
        depth: 100,
        newGroupDelay: 1
    }),
    keymap({"Mod-z": undo, "Mod-y": redo}),
    keymap(baseKeymap)
]

export default prosemirrorPlugins;