import type { TabConfig } from "@system/features/workspace/types/tabConfig";
import type { DockviewApi, SplitviewApi } from "dockview-core";
import { create } from "zustand";

interface WorkspaceState {
  dockApi: DockviewApi | null;
  splitApi: SplitviewApi | null;

  setDockApi: (api: DockviewApi) => void;
  setSplitApi: (api: SplitviewApi) => void;

  openTab: (config: TabConfig) => void;
  changeFile: (panelId: string, newFileId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  dockApi: null,
  splitApi: null,

  setDockApi: (api) => set({ dockApi: api }),
  setSplitApi: (api) => set({ splitApi: api }),
  openTab: (config) => {
    const { dockApi } = get();
    if (!dockApi) return;

    const panelId = `${Date.now()}`;
    const params =
      config.mode == "dynamic"
        ? { id: config.nodeId, type: config.type, mode: "dynamic" }
        : { type: config.type, mode: "static" };

    dockApi.addPanel({
      id: panelId,
      title: config.title,
      tabComponent: "workspace",
      component: "tab",
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
}));
