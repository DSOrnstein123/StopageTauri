import type { DockviewApi, SplitviewApi } from "dockview-core";
import { create } from "zustand";

interface WorkspaceState {
  dockApi: DockviewApi | null;
  splitApi: SplitviewApi | null;

  setDockApi: (api: DockviewApi) => void;
  setSplitApi: (api: SplitviewApi) => void;

  openFile: (
    fileType: "document" | "canvas",
    fileId: string,
    title: string,
    icon?: string,
  ) => void;
  updatePanelTitel: (panelId: string, newTitle: string) => void;
  changeFile: (panelId: string, newFileId: string) => void;
  // toggleSidebar: (side: "left" | "right") => void;

  // saveLayout: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  dockApi: null,
  splitApi: null,

  setDockApi: (api) => set({ dockApi: api }),
  setSplitApi: (api) => set({ splitApi: api }),
  openFile: (fileType, fileId, title, icon?) => {
    const { dockApi } = get();
    if (!dockApi) return;

    const panelId = `${Date.now()}`;

    dockApi.addPanel({
      id: panelId,
      component: fileType,
      title: title,
      tabComponent: "workspace",
      params: { fileId: fileId, icon: icon },
    });
  },
  updatePanelTitel: (panelId, newTitle) => {
    const { dockApi } = get();
    if (!dockApi) return;

    const mainPanel = dockApi.getPanel(panelId);
    if (mainPanel) {
      mainPanel.api.setTitle(newTitle);
    }
  },
  changeFile: (panelId, newFileId) => {
    const { dockApi, updatePanelTitel } = get();
    if (!dockApi || !updatePanelTitel) return;

    const mainPanel = dockApi.getPanel(panelId);
    if (mainPanel) {
      mainPanel.api.updateParameters({ fileId: newFileId });
    }
  },
}));
