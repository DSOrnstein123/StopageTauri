import { PLUGIN_ID } from "../../identity";

export const SEGMENT_ID = `${PLUGIN_ID}.highlight` as const;
export type SEGMENT_ID = typeof SEGMENT_ID;
