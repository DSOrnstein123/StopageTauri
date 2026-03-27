import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { CustomBubbleMenu as BubbleMenu } from "../tiptap/bubble-menu/CustomBubbleMenu";
import { syncAlignAttrs } from "../tiptap/extensions/dnd/floatDragExtension";
import debounce from "@/shared/utils/debounce";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useMemo, useState, type RefObject } from "react";
import type { DocumentContentType } from "@/features/document/schemas/documentSchema";
import { useWorkspaceStore } from "../../../layout/dockview/useWorkspaceStore";
import { extensionList } from "../tiptap/extensions/extensionList";
import { usePanelContext } from "@/layout/dockview/panel-context/usePanelParams";
import TableOfContents, {
  type TableOfContentData,
} from "@tiptap/extension-table-of-contents";

const DocumentContent = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const panelContext = usePanelContext();
  const [documentContent, setDocumentContent] =
    useState<DocumentContentType | null>(null);
  const changeFile = useWorkspaceStore((state) => state.changeFile);
  const activePanelInfo = useWorkspaceStore((state) => state.activePanelInfo);
  const setActiveEditor = useWorkspaceStore((state) => state.setActiveEditor);
  const setTOCItems = useWorkspaceStore((state) => state.setTOCItems);
  const [localTOC, setLocalTOC] = useState<TableOfContentData | null>(null);
  const panelId = panelContext.api.id;
  const documentId = panelContext.params.documentId;
  const activeDocumentId = activePanelInfo?.params?.documentId as string;

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
    if (!editor || !activePanelInfo) return;
    if (panelId === activePanelInfo.id && documentId === activeDocumentId) {
      setActiveEditor(editor);
    }
  }, [
    editor,
    documentId,
    activePanelInfo,
    panelId,
    setActiveEditor,
    activeDocumentId,
  ]);

  useEffect(() => {
    if (!editor || !activePanelInfo || !localTOC) return;
    if (panelId === activePanelInfo.id && documentId === activeDocumentId) {
      setTOCItems(localTOC);
    }
  }, [
    editor,
    documentId,
    activePanelInfo,
    panelId,
    setTOCItems,
    localTOC,
    activeDocumentId,
  ]);

  useEffect(() => {
    let cancel = false;

    invoke<DocumentContentType>("get_document_content", { id: documentId })
      .then((data) => {
        if (cancel) return;

        setDocumentContent(data);
      })
      .catch((err) => console.error(err, documentId));

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
