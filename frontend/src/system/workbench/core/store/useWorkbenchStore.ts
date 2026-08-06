import { useStore } from "zustand";
import { workbenchManager } from "../WorkbenchManager";
import type { WorkbenchState } from "./createWorkbenchStore";

const useWorkbenchStore = <T>(selector: (state: WorkbenchState) => T) => {
  return useStore(workbenchManager.getStore(), selector);
};

export default useWorkbenchStore;
