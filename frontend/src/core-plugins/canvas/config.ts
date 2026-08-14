import type { PluginManifest } from "@system/plugin-manager/plugin";
import { PLUGIN_ID } from "./identity";
import { CANVAS_TYPE, canvasConfig } from "./entries/nodes/canvas";
import { documentHighlightImporterSegmentConfig } from "./auxiliary/document-highlight-importer";

declare module "@system/plugin-manager/plugin" {
  interface PluginRegistryMap {
    [PLUGIN_ID]: {
      entries: {
        nodes: {
          [CANVAS_TYPE]: typeof canvasConfig;
        };
      };
      segments: [typeof documentHighlightImporterSegmentConfig];
    };
  }
}

export const CanvasPlugin = {
  id: PLUGIN_ID,
  name: "Canvas",
  entries: {
    nodes: {
      [CANVAS_TYPE]: canvasConfig,
    },
  },
  segments: [documentHighlightImporterSegmentConfig],
} satisfies PluginManifest;
