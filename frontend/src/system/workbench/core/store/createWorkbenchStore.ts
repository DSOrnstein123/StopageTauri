import { createStore } from "zustand";
import type { WorkbenchZone } from "../types/workbenchZone";
import type { HistoryEntry } from "@system/workbench/tab/types/navigation";
import { subscribeWithSelector } from "zustand/middleware";

export type WorkbenchStore = ReturnType<typeof createWorkbenchStore>;

export interface WorkbenchState {
  activeTabIdByZone: Record<WorkbenchZone, string | null>;
  currentEntry: HistoryEntry | null;
  status: "restoring" | "ready";
}

export const createWorkbenchStore = () =>
  createStore<WorkbenchState>()(
    subscribeWithSelector<WorkbenchState>(() => ({
      activeTabIdByZone: {
        workspace: null,
        "left-sidebar": null,
        "right-sidebar": null,
      },
      currentEntry: null,
      status: "restoring",
    })),
  );
