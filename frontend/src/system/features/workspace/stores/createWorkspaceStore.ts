import { createStore } from "zustand";

export interface WorkspaceStore {
  activeTabId: string | null;
}

export const createWorkspaceStore = () =>
  createStore<WorkspaceStore>(() => ({
    activeTabId: null,
  }));
