import { createStore } from "zustand";
import type { WorkbenchZone } from "../types/workbenchZone";

export interface WorkspaceStore {
  activeTabIdByZone: Record<WorkbenchZone, string | null>;
  status: "restoring" | "ready";
}

export const createWorkspaceStore = () =>
  createStore<WorkspaceStore>(() => ({
    activeTabIdByZone: {
      workspace: null,
      "left-sidebar": null,
      "right-sidebar": null,
    },
    status: "restoring",
  }));
