import type { HistoryEntry } from "../../tab/types/navigation";

export const resolveEntryType = (entry: HistoryEntry) =>
  entry.entryCategory == "node" ? entry.nodeType : entry.toolType;
