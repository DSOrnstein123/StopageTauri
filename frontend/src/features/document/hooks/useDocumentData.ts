import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import debounce from "@/shared/utils/debounce";
import { documentService } from "../services/documentService";
import { fileService } from "@/entities/file/services/fileService";
import { useFileContext } from "@/entities/file/components/context/FileContext";

const useDocumentData = (editor: Editor | null) => {
  const { id } = useFileContext();
  const [content, setContent] = useState("");

  useEffect(() => {
    let cancel = false;

    const getDocumentDetail = async () => {
      const data = await fileService.getDetail(id);
      if (cancel) return;

      setContent(data.content);
    };
    getDocumentDetail();

    return () => {
      cancel = true;
    };
  }, [id]);

  useEffect(() => {
    if (!editor || !content || editor.isDestroyed) return;

    const currentContent = JSON.stringify(editor.getJSON());
    if (currentContent !== content) {
      setTimeout(() => {
        if (!editor.isDestroyed) {
          queueMicrotask(() => {
            editor.commands.setContent(JSON.parse(content || '""'));
          });
        }
      }, 0);
    }
  }, [editor, content]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = debounce<(props: { editor: Editor }) => void>(
      (props) => {
        const content = props.editor.getJSON();
        documentService.updateContent(id, JSON.stringify(content));
      },
      500,
    );
    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, id]);
};

export default useDocumentData;
