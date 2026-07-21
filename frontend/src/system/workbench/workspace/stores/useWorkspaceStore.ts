import { useStore } from "zustand";
import { workspaceManager } from "../workspaceManager";
import type { WorkspaceStore } from "./createWorkspaceStore";

const useWorkspaceStore = <T>(selector: (state: WorkspaceStore) => T) => {
  return useStore(workspaceManager.getStore(), selector);
};

export default useWorkspaceStore;
