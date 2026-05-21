import { documentPlugin } from "@core-plugins/document";
import type { PluginRegistry } from "@system/registries/pluginRegistry";

const plugins = [documentPlugin];

export const bootstrapPlugin = (registry: PluginRegistry) => {
  plugins.forEach((plugin) => plugin.onRegister(registry));
};
