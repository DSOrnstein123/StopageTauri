import { useEffect, useState } from "react";
import type { DocumentContentType } from "../schemas/documentSchema";
import { Editor } from "@tiptap/react";
import debounce from "@/shared/utils/debounce";
import { documentService } from "../services/documentService";

const useDocumentData = (documentId: string, editor: Editor | null) => {
  const [documentContent, setDocumentContent] =
    useState<DocumentContentType | null>(null);

  useEffect(() => {
    let cancel = false;

    documentService
      .getContent(documentId)
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
        documentService.updateContent(documentId, JSON.stringify(content));
      },
      500,
    );
    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, documentId]);
};

export default useDocumentData;
