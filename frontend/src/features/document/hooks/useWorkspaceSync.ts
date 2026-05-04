import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import type { TableOfContentData } from "@tiptap/extension-table-of-contents";
import { useWorkspaceStore } from "@/core/layout/dockview/useWorkspaceStore";

const useWorkspaceSync = (
  isActiveTab: boolean,
  editor: Editor | null,
  localTOC: TableOfContentData | null,
) => {
  const setTOCItems = useWorkspaceStore((state) => state.setTOCItems);
  const setActiveEditor = useWorkspaceStore((state) => state.setActiveEditor);

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
