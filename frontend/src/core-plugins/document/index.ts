export * from "./public";

import DocumentSidebar from "./components/DocumentTOCAuxiliary";
import DocumentView from "./components/DocumentView";
import { NODES, PLUGIN_ID } from "./constants";
import type { PluginManifest } from "@system/registries/plugin";
import { documentConfig } from "./config/nodes/document";

export { DocumentView, DocumentSidebar };

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.document": {
      entries: {
        nodes: {
          [NODES.DOCUMENT]: typeof documentConfig;
        };
      };
    };
  }
}

export const DocumentPlugin = {
  id: PLUGIN_ID,
  name: "Document",
  entries: {
    nodes: {
      [NODES.DOCUMENT]: documentConfig,
    },
  },
} satisfies PluginManifest;
