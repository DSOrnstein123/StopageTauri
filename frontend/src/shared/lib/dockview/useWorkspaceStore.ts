import type { DockviewApi, SplitviewApi } from "dockview-core";
import { create } from "zustand";

interface WorkspaceState {
  dockApi: DockviewApi | null;
  splitApi: SplitviewApi | null;

  setDockApi: (api: DockviewApi) => void;
  setSplitApi: (api: SplitviewApi) => void;

  openFile: (id: string, name: string, icon?: string) => void;
  changeFile: (panelId: string, newFileId: string) => void;
  // toggleSidebar: (side: "left" | "right") => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  dockApi: null,
  splitApi: null,

  setDockApi: (api) => set({ dockApi: api }),
  setSplitApi: (api) => set({ splitApi: api }),
  openFile: (id, name) => {
    const { dockApi } = get();
    if (!dockApi) return;

    const panelId = `${Date.now()}`;

    dockApi.addPanel({
      id: panelId,
      component: "file",
      title: name,
      tabComponent: "workspace",
      params: { id: id },
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
}));
