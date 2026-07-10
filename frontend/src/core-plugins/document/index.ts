export * from "./public";

import DocumentSidebar from "./entries/nodes/document/components/DocumentTOCAuxiliary";
import DocumentView from "./entries/nodes/document/components/DocumentView";
import { NODES, PLUGIN_ID } from "./entries/nodes/document/constants";
import type { PluginManifest } from "@system/registries/plugin";
import { documentConfig } from "./entries/nodes/document/config";

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
