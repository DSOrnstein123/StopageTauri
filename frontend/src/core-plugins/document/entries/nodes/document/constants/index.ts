import type { CreateNodePayload } from "@system/entry/categories/node/core/types/payload";
import type { PluginId } from "@system/plugin-manager/plugin";
import { TYPE } from "../definition";

export const PLUGIN_ID: PluginId = "core.document" as const;

export const DEFAULT_DOCUMENT_VALUES: CreateNodePayload = {
  name: "Untitled",
  kind: "file",
  type: TYPE,
  data: {},
};
