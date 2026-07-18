import { createStore } from "zustand";

export interface WorkspaceStore {
  activeTabId: string | null;
  status: "restoring" | "ready";
}

export const createWorkspaceStore = () =>
  createStore<WorkspaceStore>(() => ({
    activeTabId: null,
    status: "restoring",
  }));
