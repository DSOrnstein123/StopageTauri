import { DocumentPlugin } from "@core-plugins/document";
import { TemplateManagerPlugin } from "@core-plugins/template-manager";
import type { PluginManifest } from "@system/registries/plugin";
import type { PluginRegistry } from "@system/registries/pluginRegistry";

const plugins: PluginManifest[] = [DocumentPlugin, TemplateManagerPlugin];

export const bootstrapPlugin = (registry: PluginRegistry) => {
  plugins.forEach((plugin) => {
    registry.register(plugin);
    if (plugin.onRegister) {
      plugin.onRegister();
    }
  });
};
