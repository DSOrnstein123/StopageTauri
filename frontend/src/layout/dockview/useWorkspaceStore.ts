import type { DockviewApi, SplitviewApi } from "dockview-core";
import { create } from "zustand";
import type { PanelParams, PanelType } from "./panelRegistry";

interface WorkspaceState {
  dockApi: DockviewApi | null;
  splitApi: SplitviewApi | null;
  activePanelInfo: ActivePanelInfo | null;

  setDockApi: (api: DockviewApi) => void;
  setSplitApi: (api: SplitviewApi) => void;

  openFile: <T extends PanelParams>(
    fileType: PanelType,
    title: string,
    params: T,
    icon?: string,
  ) => void;
  updatePanelTitel: (panelId: string, newTitle: string) => void;
  changeFile: (panelId: string, newFileId: string) => void;
  setActivePanelInfo: (info: ActivePanelInfo) => void;
  // toggleSidebar: (side: "left" | "right") => void;

  // saveLayout: () => void;
}

interface ActivePanelInfo {
  id: string;
  type: PanelType | "none";
  fileId: string;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  dockApi: null,
  splitApi: null,
  activePanelInfo: null,

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
  setActivePanelInfo: (info) => set({ activePanelInfo: info }),
}));
