import type { EntryType } from "@system/plugin-manager/plugin";
import type { HistoryEntry } from "../tab/types/navigation";
import { resolveEntryType } from "../workspace/utils/resolveEntryType";

class AuxiliaryManager {
  private currentEntryType: EntryType | null = null;

  handleCurrentEntryChange(entry: HistoryEntry) {
    const entryType = resolveEntryType(entry);

    if (entryType === this.currentEntryType) return;
  }
}
