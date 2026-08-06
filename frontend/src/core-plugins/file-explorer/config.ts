import type { PluginManifest } from "@system/plugin-manager/plugin";
import { FileExplorerConfig } from "./tools";
import { PLUGIN_ID } from "./identity";

declare module "@system/plugin-manager/plugin" {
  interface PluginRegistryMap {
    [PLUGIN_ID]: {
      entries: {
        tools: {
          [FileExplorerConfig.type]: typeof FileExplorerConfig;
        };
      };
    };
  }
}

export const plugin = {
  id: PLUGIN_ID,
  name: "File explorer",
  entries: {
    tools: {
      [FileExplorerConfig.type]: FileExplorerConfig,
    },
  },
} satisfies PluginManifest;
