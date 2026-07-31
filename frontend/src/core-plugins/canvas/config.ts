import type { PluginManifest } from "@system/plugin-manager/plugin";
import { PLUGIN_ID } from "./identity";
import { CANVAS_TYPE, canvasConfig } from "./entries/nodes/canvas";

declare module "@system/plugin-manager/plugin" {
  interface PluginRegistryMap {
    [PLUGIN_ID]: {
      entries: {
        nodes: {
          [CANVAS_TYPE]: typeof canvasConfig;
        };
      };
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
} satisfies PluginManifest;
