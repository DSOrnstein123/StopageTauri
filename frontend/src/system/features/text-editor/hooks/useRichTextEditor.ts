import { useEditor, type UseEditorOptions } from "@tiptap/react";

const DEFAULT_RICH_TEXT_EDITOR_OPTIONS: Partial<UseEditorOptions> = {
  immediatelyRender: false,
  editorProps: {
    attributes: {
      class: "focus:outline-none prose-mirror-container",
    },
  },
};

export const useRichTextEditor = (options?: Partial<UseEditorOptions>) =>
  useEditor({
    ...DEFAULT_RICH_TEXT_EDITOR_OPTIONS,
    ...options,
  });
