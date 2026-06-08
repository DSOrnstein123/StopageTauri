import {
  type Editor,
  EditorContent,
  useEditor,
  useEditorState,
  type Extensions,
  type JSONContent,
} from "@tiptap/react";
import { BubbleMenu } from "../components/BubbleMenu";

export type { Editor as TextEditor };

export interface BlockEditorOptions {
  content?: JSONContent;
  extensions?: Extensions;
}

export const tiptapAdapter = {
  EditorContent: EditorContent,
  BubbleMenu: BubbleMenu,

  useTextEditor: (options?: BlockEditorOptions) => {
    useEditor({
      content: options?.content,
      extensions: options?.extensions,
    });
  },
  useEditorState: useEditorState,
};
