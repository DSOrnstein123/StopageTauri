import type { SegmentConfig } from "@system/entry/auxiliary/auxiliary";

export class AuxiliaryTab {
  private segments = new Map<string, SegmentConfig>();

  getSegments() {
    return this.segments;
  }
}
