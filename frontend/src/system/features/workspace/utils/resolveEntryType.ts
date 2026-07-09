import type { HistoryEntry } from "../types/navigation";

export const resolveEntryType = (entry: HistoryEntry) =>
  entry.entryCategory == "node" ? entry.nodeType : entry.toolType;
