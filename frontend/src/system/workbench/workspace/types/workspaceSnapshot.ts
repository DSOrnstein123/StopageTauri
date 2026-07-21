import type { JsonObject } from "@system/shared/types/json";
import type { HistoryEntry } from "../../tab/types/navigation";

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
