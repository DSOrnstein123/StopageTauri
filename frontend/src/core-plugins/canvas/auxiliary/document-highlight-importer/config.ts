import type { SegmentConfig } from "@system/entry/auxiliary/auxiliary";
import { View } from "./View";
import { SEGMENT_ID } from "./identity";

export const config = {
  id: SEGMENT_ID,
  name: "Highlight importer",
  view: View,
} satisfies SegmentConfig;
