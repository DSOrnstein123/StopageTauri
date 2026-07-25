import { useEffect } from "react";
import { Editor, type JSONContent } from "@system/lib/tiptap";

const useHydrateRichTextEditor = (
  editor: Editor | null,
  content: JSONContent,
) => {
  useEffect(() => {
    if (!editor || !content || editor.isDestroyed) return;

    const currentContent = editor.getJSON();
    if (currentContent === content) {
      return;
    }

    const isEmptyObject = Object.keys(content).length === 0;
    const initialContent = isEmptyObject ? "" : content;

    queueMicrotask(() => {
      editor.commands.setContent(initialContent, { emitUpdate: false });
    });
  }, [editor, content]);
};

export default useHydrateRichTextEditor;
