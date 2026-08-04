import type { SegmentConfig } from "@system/entry/auxiliary/auxiliary";
import { Tab } from "../tab";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import { createStore, type AuxiliaryTabStore } from "./store";

export class AuxiliaryTab extends Tab {
  readonly store: AuxiliaryTabStore;
  private segments = new Map<string, SegmentConfig>();

  constructor(workspaceHost: WorkbenchHost, id?: string) {
    super(workspaceHost, id);
    this.store = createStore();
  }

  getSegments() {
    return this.segments;
  }
}
