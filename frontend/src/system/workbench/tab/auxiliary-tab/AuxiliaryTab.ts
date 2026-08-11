import type { SegmentConfig } from "@system/entry/auxiliary/auxiliary";
import { BaseTab } from "../BaseTab";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import { createStore, type AuxiliaryTabStore } from "./store";
import type { EntryType } from "@system/plugin-manager/plugin";

export class AuxiliaryTab extends BaseTab {
  readonly kind = "auxiliary";
  readonly entryType: EntryType;
  readonly store: AuxiliaryTabStore;
  readonly segments: ReadonlyMap<string, SegmentConfig>;

  constructor(
    workspaceHost: WorkbenchHost,
    entryType: EntryType,
    segments: Record<string, SegmentConfig>,
    id?: string,
  ) {
    super(workspaceHost, id);
    this.entryType = entryType;
    this.store = createStore();
    this.segments = new Map(Object.entries(segments));
  }

  getSegmentView(id: string) {
    const segmentConfig = this.segments.get(id);

    if (!segmentConfig) {
      throw new Error(`Segment ${id} is not registered`);
    }

    return segmentConfig.view;
  }
}
