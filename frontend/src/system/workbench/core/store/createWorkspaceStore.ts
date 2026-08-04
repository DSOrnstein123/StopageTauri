import { createStore } from "zustand";
import type { WorkbenchZone } from "../types/workbenchZone";
import type { HistoryEntry } from "@system/workbench/tab/types/navigation";

export interface WorkspaceStore {
  activeTabIdByZone: Record<WorkbenchZone, string | null>;
  currentEntry: HistoryEntry | null;
  status: "restoring" | "ready";
}

export const createWorkspaceStore = () =>
  createStore<WorkspaceStore>(() => ({
    activeTabIdByZone: {
      workspace: null,
      "left-sidebar": null,
      "right-sidebar": null,
    },
    currentEntry: null,
    status: "restoring",
  }));
