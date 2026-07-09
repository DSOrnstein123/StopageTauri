import { useStore } from "zustand";
import { workspaceManager } from "../classes/workspaceManager";
import type { WorkspaceStore } from "./createWorkspaceStore";

const useWorkspaceStore = <T>(selector: (state: WorkspaceStore) => T) => {
  return useStore(workspaceManager.getStore(), selector);
};

export default useWorkspaceStore;
