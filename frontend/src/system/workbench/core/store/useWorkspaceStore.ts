import { useStore } from "zustand";
import { workbenchManager } from "../WorkbenchManager";
import type { WorkspaceStore } from "./createWorkspaceStore";

const useWorkbenchStore = <T>(selector: (state: WorkspaceStore) => T) => {
  return useStore(workbenchManager.getStore(), selector);
};

export default useWorkbenchStore;
