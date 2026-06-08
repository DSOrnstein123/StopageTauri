import { Editor, useEditor } from "@tiptap/react";
import TableOfContents, {
  type TableOfContentData,
} from "@tiptap/extension-table-of-contents";
import { useMemo, useState, type RefObject } from "react";
import { syncAlignAttrs } from "@system/lib/tiptap/extensions/dnd/floatDragExtension";
import { systemApi } from "@system/apis";
import { extensionList } from "@system/lib/tiptap/extensions";

const useDocumentEditor = (
  tabId: string,
  editorRef: RefObject<Editor | null>,
) => {
  const [localTOC, setLocalTOC] = useState<TableOfContentData | null>(null);

  const extensions = useMemo(
    () => [
      ...extensionList,
      TableOfContents.configure({
        onUpdate: (content) => {
          setLocalTOC((prev) => (prev === content ? prev : content));
        },
      }),
    ],
    [],
  );

  const editor = useEditor({
    immediatelyRender: false,
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
