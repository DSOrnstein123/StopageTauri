import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { CustomBubbleMenu as BubbleMenu } from "../tiptap/bubble-menu/CustomBubbleMenu";
import { syncAlignAttrs } from "../tiptap/extensions/dnd/floatDragExtension";
import debounce from "@/shared/utils/debounce";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState, type RefObject } from "react";
import type { DocumentContentType } from "@/routes/(features)/document/schemas/documentSchema";
import { useWorkspaceStore } from "../../../../layout/dockview/useWorkspaceStore";
import { extensionList } from "../tiptap/extensions/extensionList";
import { usePanelContext } from "@/layout/dockview/panel-context/usePanelParams";

const DocumentContent = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const panelContext = usePanelContext();
  const [documentContent, setDocumentContent] =
    useState<DocumentContentType | null>(null);
  const changeFile = useWorkspaceStore((state) => state.changeFile);
  const panelId = panelContext.api.id;
  const documentId = panelContext.params.documentId;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensionList,
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
          //TODO: change to scalable link
          const documentId = href.split("/documents/")[1];
          changeFile(panelId, documentId);
          return true;
        }

        if (href) {
          window.open(href, "_blank");
          return true;
        }

        return false;
      },
    },
    onCreate({ editor }) {
      setTimeout(() => {
        if (!editor.isDestroyed) {
          syncAlignAttrs(editor.view);
        }
      }, 0);
    },
  });

  useEffect(() => {
    let cancel = false;

    invoke<DocumentContentType>("get_document_content", { id: documentId })
      .then((data) => {
        if (cancel) setDocumentContent(data);
      })
      .catch((err) => console.error(err));

    return () => {
      cancel = true;
    };
  }, [documentId]);

  useEffect(() => {
    if (!editor || !documentContent || editor.isDestroyed) return;

    const currentContent = JSON.stringify(editor.getJSON());
    if (currentContent !== documentContent.content) {
      setTimeout(() => {
        if (!editor.isDestroyed) {
          queueMicrotask(() => {
            editor.commands.setContent(
              JSON.parse(documentContent.content || '""'),
            );
          });
        }
      }, 0);
    }
  }, [editor, documentContent]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = debounce<(props: { editor: Editor }) => void>(
      (props) => {
        const content = props.editor.getJSON();
        invoke("update_document", {
          id: documentId,
          content: JSON.stringify(content),
        });
      },
      500,
    );
    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, documentId]);

  useEffect(() => {
    if (editor) {
      editorRef.current = editor;
    }
    return () => {
      editorRef.current = null;
    };
  }, [editor, editorRef]);

  if (!editor) return;

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};

export default DocumentContent;
