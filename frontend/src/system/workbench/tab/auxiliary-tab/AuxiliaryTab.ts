import type { SegmentConfig } from "@system/entry/auxiliary/auxiliary";
import { BaseTab } from "../BaseTab";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import { createStore, type AuxiliaryTabStore } from "./store";
import type { EntryType } from "@system/plugin-manager/plugin";

export class AuxiliaryTab extends BaseTab {
  readonly kind = "auxiliary";
  readonly entryType: EntryType;
  readonly store: AuxiliaryTabStore;
  private segments = new Map<string, SegmentConfig>();

  constructor(workspaceHost: WorkbenchHost, entryType: EntryType, id?: string) {
    super(workspaceHost, id);
    this.entryType = entryType;
    this.store = createStore();
  }

  getSegments() {
    return this.segments;
  }
}
