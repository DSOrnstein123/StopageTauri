import { useEditor, type UseEditorOptions } from "@tiptap/react";
import { richTextEditorExtensions } from "../extensions";

const DEFAULT_RICH_TEXT_EDITOR_OPTIONS: Partial<UseEditorOptions> = {
  immediatelyRender: false,
  extensions: richTextEditorExtensions,
  editorProps: {
    attributes: {
      class: "focus:outline-none prose-mirror-container",
    },
  },
};

export const useRichTextEditor = (options?: Partial<UseEditorOptions>) => {
  const defaultClass =
    DEFAULT_RICH_TEXT_EDITOR_OPTIONS.editorProps?.attributes?.class || "";
  const customClass = options?.editorProps?.attributes?.class || "";
  const mergedClass = `${defaultClass} ${customClass}`.trim();

  return useEditor({
    ...DEFAULT_RICH_TEXT_EDITOR_OPTIONS,
    ...options,

    extensions: [
      ...(DEFAULT_RICH_TEXT_EDITOR_OPTIONS.extensions || []),
      ...(options?.extensions || []),
    ],

    editorProps: {
      ...DEFAULT_RICH_TEXT_EDITOR_OPTIONS.editorProps,
      ...options?.editorProps,

      attributes: {
        ...DEFAULT_RICH_TEXT_EDITOR_OPTIONS.editorProps?.attributes,
        ...options?.editorProps?.attributes,
        class: mergedClass,
      },
    },
  });
};
