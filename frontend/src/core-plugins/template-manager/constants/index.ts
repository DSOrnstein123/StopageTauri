import type { NodeListOptions } from "@system/entry/categories/node/core/types/payload";
import type { PluginId } from "@system/plugin-manager/plugin";

export const PLUGIN_ID: PluginId = "core.template-manager" as const;
export const TOOLS = {
  TEMPLATE_MANAGER: "template-manager",
} as const;

export const TEMPLATE_CONFIG: NodeListOptions = {
  includeKinds: ["template"],
};
