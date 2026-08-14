import { BlockEditorConfig } from "@core-plugins/block-editor";
import { CanvasPlugin } from "@core-plugins/canvas/config";
import { DocumentPlugin } from "@core-plugins/document";
import { FileExplorerPlugin } from "@core-plugins/file-explorer";
import { TemplateManagerPlugin } from "@core-plugins/template-manager";
import type { PluginManifest } from "@system/plugin-manager/plugin";
import type { PluginManager } from "@system/plugin-manager/pluginManager";

const plugins: PluginManifest[] = [
  BlockEditorConfig,
  DocumentPlugin,
  TemplateManagerPlugin,
  CanvasPlugin,
  FileExplorerPlugin,
];

export const bootstrapPlugin = (registry: PluginManager) => {
  plugins.forEach((plugin) => {
    console.log(plugin);
    registry.register(plugin);
    if (plugin.onRegister) {
      plugin.onRegister();
    }
  });
};
