import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import type { TableOfContentData } from "@tiptap/extension-table-of-contents";
import { useDocumentStore } from "../store/useDocumentStore";

const useWorkspaceSync = (
  isActiveTab: boolean,
  editor: Editor | null,
  localTOC: TableOfContentData | null,
) => {
  const setTOCItems = useDocumentStore((state) => state.setTOCItems);
  const setActiveEditor = useDocumentStore((state) => state.setActiveEditor);

  useEffect(() => {
    if (!editor) return;
    if (isActiveTab) {
      setActiveEditor(editor);
    }
  }, [editor, setActiveEditor, isActiveTab]);

  useEffect(() => {
    if (!editor || !localTOC) return;
    if (isActiveTab) {
      setTOCItems(localTOC);
    }
  }, [editor, localTOC, setTOCItems, isActiveTab]);
};

export default useWorkspaceSync;
