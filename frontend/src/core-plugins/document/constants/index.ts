import type { CreateNodePayload } from "@system/features/node/types";
import type { NodeType, PluginId } from "@system/registries/plugin";

export const PLUGIN_ID: PluginId = "core.document";
export const NODES = {
  DOCUMENT: "document",
} satisfies Record<string, NodeType>;

export const DEFAULT_DOCUMENT_VALUES: CreateNodePayload = {
  name: "Untitled",
  kind: "file",
  type: PLUGIN_ID,
  data: {},
};
