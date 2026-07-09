import type {
  EntryCategory,
  NodeType,
  ToolType,
} from "@system/registries/plugin";

interface BaseHistoryEntry {
  title?: string;
  entryCategory: EntryCategory;
}

interface HistoryNodeEntry extends BaseHistoryEntry {
  entryCategory: "node";
  nodeId: string;
  nodeType: NodeType;
}

interface HistoryToolEntry extends BaseHistoryEntry {
  entryCategory: "tool";
  toolType: ToolType;
}

export type HistoryEntry = HistoryNodeEntry | HistoryToolEntry;
