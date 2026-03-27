import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import { useWorkspaceStore } from "@/layout/dockview/useWorkspaceStore";
import { usePanelContext } from "@/layout/dockview/panel-context/usePanelParams";
import type { TableOfContentData } from "@tiptap/extension-table-of-contents";

const useWorkspaceSync = (
  editor: Editor | null,
  documentId: string,
  localTOC: TableOfContentData | null,
) => {
  const activePanelInfo = useWorkspaceStore((state) => state.activePanelInfo);
  const activeDocumentId = activePanelInfo?.params?.documentId as string;
  const setTOCItems = useWorkspaceStore((state) => state.setTOCItems);
  const setActiveEditor = useWorkspaceStore((state) => state.setActiveEditor);
  const panelContext = usePanelContext();
  const panelId = panelContext.api.id;

  const isActivePanel =
    panelId === activePanelInfo?.id && documentId === activeDocumentId;

  useEffect(() => {
    if (!editor || !activePanelInfo) return;
    if (isActivePanel) {
      setActiveEditor(editor);
    }
  }, [
    editor,
    documentId,
    setActiveEditor,
    isActivePanel,
    activePanelInfo,
    panelId,
    activeDocumentId,
  ]);

  useEffect(() => {
    if (!editor || !activePanelInfo || !localTOC) return;
    if (isActivePanel) {
      setTOCItems(localTOC);
    }
  }, [
    editor,
    documentId,
    localTOC,
    setTOCItems,
    isActivePanel,
    activePanelInfo,
    panelId,
    activeDocumentId,
  ]);
};

export default useWorkspaceSync;
