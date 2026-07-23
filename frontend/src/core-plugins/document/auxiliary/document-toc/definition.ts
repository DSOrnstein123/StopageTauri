import type { SegmentConfig } from "@system/entry/auxiliary/auxiliary";
import s from "./components/s";

export const SEGMENT = "document-toc" as const;
export type SEGMENT = typeof SEGMENT;

export const config = {
  view: s,
} satisfies SegmentConfig;
