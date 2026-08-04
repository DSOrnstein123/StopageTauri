import type {
  EntryCategory,
  NodeType,
  ToolType,
} from "@system/plugin-manager/plugin";

interface BaseHistoryEntry {
  title?: string;
  entryCategory: EntryCategory;
}

export interface HistoryNodeEntry extends BaseHistoryEntry {
  entryCategory: "node";
  nodeId: string;
  nodeType: NodeType;
}

export interface HistoryToolEntry extends BaseHistoryEntry {
  entryCategory: "tool";
  toolType: ToolType;
}

export type HistoryEntry = HistoryNodeEntry | HistoryToolEntry;
