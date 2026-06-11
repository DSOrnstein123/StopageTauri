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
  const defaultAttributes = DEFAULT_RICH_TEXT_EDITOR_OPTIONS.editorProps
    ?.attributes as Record<string, string>;
  const defaultClass = defaultAttributes.class;

  const customAttributes = options?.editorProps?.attributes as Record<
    string,
    string
  >;
  const customClass = customAttributes.class;

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
