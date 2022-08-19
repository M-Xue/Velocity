/// <reference types="react-scripts" />

import { EditorView } from "prosemirror-view";

declare module 'styled-components';
declare module 'lodash';
declare module 'react-beautiful-dnd';


declare global {
interface Window {
    view: EditorView;
}
}
  