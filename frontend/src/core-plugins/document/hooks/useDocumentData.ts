import { useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import debounce from "@system/utils/debounce";
import useDocumentContent from "./useDocumentContent";
import { systemApi } from "@system/api";

const useDocumentData = (id: string, editor: Editor | null) => {
  const { data: content } = useDocumentContent(id);
  const isHydrated = useRef(false);
  useEffect(() => {
    isHydrated.current = false;
  }, [id]);

  useEffect(() => {
    if (!editor || !content || editor.isDestroyed || isHydrated.current) return;

    const isEmptyObject = Object.keys(content).length === 0;
    const initialContent = isEmptyObject ? "" : content;

    queueMicrotask(() => {
      editor.commands.setContent(initialContent, { emitUpdate: false });
      isHydrated.current = true;
    });
  }, [editor, content]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = debounce<(props: { editor: Editor }) => void>(
      (props) => {
        const content = props.editor.getJSON();
        systemApi.node.updateData(id, content);
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
