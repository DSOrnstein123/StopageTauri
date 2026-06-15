import { create } from "zustand";

interface WorkspaceStore {
  activeTabId: string | null;

  setActiveTabId: (tabId: string | null) => void;
}

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeTabId: null,

  setActiveTabId: (tabId) => set({ activeTabId: tabId }),
}));

export default useWorkspaceStore;
