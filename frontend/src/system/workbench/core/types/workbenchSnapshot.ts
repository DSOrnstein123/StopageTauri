import type { JsonObject } from "@system/shared/types/json";
import type { HistoryEntry } from "../../tab/types/navigation";
import type { WorkbenchZone } from "./workbenchZone";

export interface WorkbenchStateSnapshot {
  tabRecords: {
    id: string;
    currentEntry: HistoryEntry;
    zone: WorkbenchZone;
  }[];
  activeTabIdByZone: Record<WorkbenchZone, string | null>;
}

export type WorkbenchLayoutSnapshot = Record<WorkbenchZone, string | null>;

export interface WorkbenchSnapshot {
  state: WorkbenchStateSnapshot;
  layout: JsonObject;
}
