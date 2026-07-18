import type { JsonObject } from "@system/types/json";
import type { HistoryEntry } from "./navigation";
import type { OpenTabParams } from "./tabParams";

export interface WorkspaceHost {
  setTitle: (id: string, newTitle: string) => void;
  openTab: (id: string, params: OpenTabParams) => void;
  closeTab: (id: string) => void;
  navigate: (id: string, path: HistoryEntry) => void;

  applyLayout: (layout: JsonObject) => void;
  loadDefaultLayout: () => void;

  onLayoutChange: (listener: (layout: JsonObject) => void) => void;
}
