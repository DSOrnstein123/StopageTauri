import type { JsonObject } from "@system/shared/types/json";
import type { HistoryEntry } from "../../tab/types/navigation";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";
import type { TabRecord } from "./tabRecord";
import type { WorkbenchZone } from "./workbenchZone";

export interface WorkbenchHost {
  setTitle: (id: string, newTitle: string) => void;
  openTab: (record: TabRecord, params: OpenTabParams) => void;
  closeTab: (zone: WorkbenchZone, id: string) => void;
  navigate: (id: string, path: HistoryEntry) => void;

  applyLayout: (layout: JsonObject) => void;
  loadDefaultLayout: () => void;

  onActiveTabChange: (
    listener: (zone: WorkbenchZone, tabId: string) => void,
  ) => void;
  onLayoutChange: (listener: (layout: JsonObject) => void) => void;
}
