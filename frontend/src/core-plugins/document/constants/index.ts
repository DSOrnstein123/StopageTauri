import type { CreateNodePayload } from "@system/features/node/types";

export const PLUGIN_ID = "core.document";

export const DEFAULT_DOCUMENT_VALUES: CreateNodePayload = {
  name: "Untitled",
  kind: "file",
  type: PLUGIN_ID,
};
