import type { CreateNodePayload } from "@system/features/node/types";
import type { PluginId } from "@system/registries/plugin";

export const PLUGIN_ID: PluginId = "core.document" as const;
export const NODES = {
  DOCUMENT: "document",
} as const;

export const DEFAULT_DOCUMENT_VALUES: CreateNodePayload = {
  name: "Untitled",
  kind: "file",
  type: NODES.DOCUMENT,
  data: {},
};
