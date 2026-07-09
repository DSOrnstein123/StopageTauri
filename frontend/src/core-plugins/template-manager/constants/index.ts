import type { NodeFilterOptions } from "@system/features/node/types";
import type { PluginId } from "@system/registries/plugin";

export const PLUGIN_ID: PluginId = "core.template-manager" as const;
export const NODES = {
  DOCUMENT_TEMPLATE: "document-template",
} as const;
export const TOOLS = {
  TEMPLATE_MANAGER: "template-manager",
} as const;

export const TEMPLATE_CONFIG: NodeFilterOptions = {
  includeKinds: ["template"],
};
