import type { CreateNodePayload } from "@system/features/node/shared/types";
import type { PluginId } from "@system/registries/plugin";

export const PLUGIN_ID: PluginId = "core.document" as const;
export const TYPE = "document" as const;
export type TYPE = typeof TYPE;

export const DEFAULT_DOCUMENT_VALUES: CreateNodePayload = {
  name: "Untitled",
  kind: "file",
  type: TYPE,
  data: {},
};
