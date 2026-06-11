import { DocumentPlugin } from "@core-plugins/document";
import { TemplateManagerPlugin } from "@core-plugins/template-manager";
import type { PluginRegistry } from "@system/registries/pluginRegistry";

const plugins = [DocumentPlugin, TemplateManagerPlugin];

export const bootstrapPlugin = (registry: PluginRegistry) => {
  plugins.forEach((plugin) => {
    registry.register(plugin);
    if (plugin.onRegister) {
      plugin.onRegister();
    }
  });
};
