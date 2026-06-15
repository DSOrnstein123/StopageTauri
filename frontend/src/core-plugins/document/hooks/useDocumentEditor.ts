import { useRichTextEditor } from "@system/features/text-editor";
import { useDocumentContext } from "../context/useDocumentContext";
import useDocumentData from "./useDocumentData";
import { useEffect } from "react";

const useDocumentEditor = (documentId: string) => {
  const controller = useDocumentContext();
  const editor = useRichTextEditor({
    onTOCUpdate: (data) => {
      console.log("TOC UPDATE", controller.getStore()?.getState().tocContent);
      controller.getStore()?.getState().setTOCContent(data);
    },
  });

  useDocumentData(documentId, editor);

  useEffect(() => {
    controller.setEditor(editor);
  }, [controller, editor]);

  return editor;
};

export default useDocumentEditor;
