import type { highlightSegmentConfig } from "./segments/highlight";

export * from "./provider/block-editor-provider/public";
export { config as BlockEditorConfig } from "./config";

declare module "@system/plugin-manager/plugin" {
  interface PluginRegistryMap {
    "core.block-editor": {
      segments: [typeof highlightSegmentConfig];
    };
  }
}
