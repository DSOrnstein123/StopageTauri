import { DocumentPlugin } from "@core-plugins/document";
import { TemplateManagerPlugin } from "@core-plugins/template-manager";
import type { PluginManifest } from "@system/plugin-manager/plugin";
import type { PluginManager } from "@system/plugin-manager/pluginManager";

const plugins: PluginManifest[] = [DocumentPlugin, TemplateManagerPlugin];

export const bootstrapPlugin = (registry: PluginManager) => {
  plugins.forEach((plugin) => {
    registry.register(plugin);
    if (plugin.onRegister) {
      plugin.onRegister();
    }
  });
};
