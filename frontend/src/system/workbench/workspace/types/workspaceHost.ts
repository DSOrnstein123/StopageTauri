import type { JsonObject } from "@system/shared/types/json";
import type { HistoryEntry } from "../../tab/types/navigation";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";

export interface WorkspaceHost {
  setTitle: (id: string, newTitle: string) => void;
  openTab: (id: string, params: OpenTabParams) => void;
  closeTab: (id: string) => void;
  navigate: (id: string, path: HistoryEntry) => void;

  applyLayout: (layout: JsonObject) => void;
  loadDefaultLayout: () => void;

  onLayoutChange: (listener: (layout: JsonObject) => void) => void;
}
