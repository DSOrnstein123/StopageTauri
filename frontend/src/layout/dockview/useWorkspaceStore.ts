import type { DockviewApi, SplitviewApi } from "dockview-core";
import { create } from "zustand";
import { Editor } from "@tiptap/react";
import type { TableOfContentData } from "@tiptap/extension-table-of-contents";
import type { FeatureType } from "@/registry/featureRegistry";
import type { PanelParamsRegistry } from "./Adapter";

interface WorkspaceState {
  dockApi: DockviewApi | null;
  splitApi: SplitviewApi | null;
  activePanelInfo: ActivePanelInfo | null;
  activeEditor: Editor | null;
  tocItems: TableOfContentData | null;

  setDockApi: (api: DockviewApi) => void;
  setSplitApi: (api: SplitviewApi) => void;

  openFile: <T extends FeatureType>(
    fileType: T,
    title: string,
    params: PanelParamsRegistry[T],
    icon?: string,
  ) => void;
  changeFile: (panelId: string, newFileId: string) => void;
  setActivePanelInfo: (info: ActivePanelInfo | null) => void;
  setActiveEditor: (editor: Editor) => void;
  setTOCItems: (tocItems: TableOfContentData) => void;
  // toggleSidebar: (side: "left" | "right") => void;
}

interface ActivePanelInfo {
  id: string;
  type: FeatureType | "none";
  params: Record<string, unknown> | null;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  dockApi: null,
  splitApi: null,
  activePanelInfo: null,
  activeEditor: null,
  tocItems: null,

  setDockApi: (api) => set({ dockApi: api }),
  setSplitApi: (api) => set({ splitApi: api }),
  openFile: (fileType, title, params) => {
    const { dockApi } = get();
    if (!dockApi) return;

    const panelId = `${Date.now()}`;

    dockApi.addPanel({
      id: panelId,
      component: fileType,
      title: title,
      tabComponent: "workspace",
      params: params,
    });
  },
  changeFile: (panelId, newFileId) => {
    const { dockApi } = get();
    if (!dockApi) return;

    const mainPanel = dockApi.getPanel(panelId);
    if (mainPanel) {
      mainPanel.api.updateParameters({ fileId: newFileId });
    }
  },
  setActivePanelInfo: (info) => set({ activePanelInfo: info }),
  setActiveEditor: (editor) => set({ activeEditor: editor }),
  setTOCItems: (tocItems) => set({ tocItems: tocItems }),
}));
