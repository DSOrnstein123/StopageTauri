import type { NodeFilterOptions } from "@system/features/node/types";
import type { NodeType } from "@system/registries/node";
import type { PluginId } from "@system/registries/plugin";

export const PLUGIN_ID: PluginId = "core.template-manager" as const;
export const NODES: Record<string, NodeType> = {
  DOCUMENT_TEMPLATE: "document-template",
} as const;

export const TEMPLATE_CONFIG: NodeFilterOptions = {
  includeKinds: ["template"],
};
