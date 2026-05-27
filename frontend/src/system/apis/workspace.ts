import { useWorkspaceStore } from "@system/features/workspace/stores/useWorkspaceStore";
import type { TabConfig } from "@system/features/workspace/types/tabConfig";

export const workspaceApi = {
  openTab: (config: TabConfig) => {
    useWorkspaceStore.getState().openTab(config);
  },
};
