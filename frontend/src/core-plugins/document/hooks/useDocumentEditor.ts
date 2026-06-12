import { TableOfContents, type TableOfContentData } from "@system/lib/tiptap";
import { useMemo, useState } from "react";
import { syncAlignAttrs } from "@system/features/text-editor/extensions/dnd/floatDragExtension";
import { systemApi } from "@system/api";
import { useRichTextEditor } from "@system/features/text-editor";
import type { SetEditorRef } from "@system/features/node/context/NodeEditorContext";

const useDocumentEditor = (tabId: string, setEditorRef: SetEditorRef) => {
  const [localTOC, setLocalTOC] = useState<TableOfContentData | null>(null);

  const extensions = useMemo(
    () => [
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
      attributes: {
        class: "focus:outline-none prose-mirror-container",
      },
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
      setEditorRef(editor);

      setTimeout(() => {
        if (!editor.isDestroyed) {
          syncAlignAttrs(editor.view);
        }
      }, 0);
    },
    onDestroy: () => {
      setEditorRef(null);
    },
  });

  return { editor, localTOC };
};

export default useDocumentEditor;
