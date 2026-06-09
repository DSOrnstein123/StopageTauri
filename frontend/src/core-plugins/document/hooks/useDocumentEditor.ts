import {
  Editor,
  TableOfContents,
  type TableOfContentData,
} from "@system/lib/tiptap";
import { useMemo, useState, type RefObject } from "react";
import { syncAlignAttrs } from "@system/features/text-editor/extensions/dnd/floatDragExtension";
import { systemApi } from "@system/apis";
import { richTextEditorExtensions } from "@system/features/text-editor/extensions";
import { useRichTextEditor } from "@system/features/text-editor";

const useDocumentEditor = (
  tabId: string,
  editorRef: RefObject<Editor | null>,
) => {
  const [localTOC, setLocalTOC] = useState<TableOfContentData | null>(null);

  const extensions = useMemo(
    () => [
      ...richTextEditorExtensions,
      TableOfContents.configure({
        onUpdate: (content) => {
          setLocalTOC((prev) => (prev === content ? prev : content));
        },
      }),
    ],
    [],
  );

  const editor = useRichTextEditor({
    extensions: extensions,
    editorProps: {
      handleClick(_view, _pos, event) {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (!anchor) return false;

        const href = anchor.getAttribute("href");

        if (href?.startsWith("/documents/")) {
          // TODO: change to scalable link
          const nodeId = href.split("/documents/")[1];
          systemApi.workspace.navigate(tabId, nodeId);
          return true;
        }

        if (href) {
          window.open(href, "_blank");
          return true;
        }

        return false;
      },
    },
    onCreate: ({ editor }) => {
      editorRef.current = editor;

      setTimeout(() => {
        if (!editor.isDestroyed) {
          syncAlignAttrs(editor.view);
        }
      }, 0);
    },
    onDestroy: () => {
      editorRef.current = null;
    },
  });

  return { editor, localTOC };
};

export default useDocumentEditor;
