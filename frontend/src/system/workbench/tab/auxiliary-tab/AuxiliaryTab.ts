import type {
  SegmentConfig,
  SegmentId,
} from "@system/entry/auxiliary/auxiliary";
import { BaseTab } from "../BaseTab";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import { createStore, type AuxiliaryTabStore } from "./store";

export class AuxiliaryTab extends BaseTab {
  readonly kind = "auxiliary";
  readonly store: AuxiliaryTabStore;
  readonly segments: ReadonlyMap<SegmentId, SegmentConfig>;

  constructor(
    workspaceHost: WorkbenchHost,
    segments: ReadonlyMap<SegmentId, SegmentConfig>,
    id?: string,
  ) {
    super(workspaceHost, id);
    this.store = createStore();
    this.segments = segments;
  }

  getSegmentView(id: SegmentId) {
    const segmentConfig = this.segments.get(id);

    if (!segmentConfig) {
      throw new Error(`Segment ${id} is not registered`);
    }

    return segmentConfig.view;
  }
}
