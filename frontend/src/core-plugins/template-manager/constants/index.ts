import type { NodeFilterOptions } from "@system/features/node/types";
import type { PluginId } from "@system/registries/plugin";

export const PLUGIN_ID: PluginId = "core.template-manager";

export const TEMPLATE_CONFIG: NodeFilterOptions = {
  includeKinds: ["template"],
};
