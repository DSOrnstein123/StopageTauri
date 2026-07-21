import type { JsonObject } from "@system/types/json";
import type { HistoryEntry } from "./navigation";

export interface WorkspaceStateSnapshot {
  tabs: {
    id: string;
    currentEntry: HistoryEntry;
  }[];
  activeTabId: string | null;
}

export interface WorkspaceSnapshot {
  state: WorkspaceStateSnapshot;
  layout: JsonObject;
}
