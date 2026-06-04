import { DocumentFileSchema } from "./schemas/documentSchema";
import DocumentSidebar from "./components/DocumentSidebar";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";
import { NODES, PLUGIN_ID } from "./constants";
import type { Plugin } from "@system/registries/plugin";

export { DocumentView, DocumentSidebar };

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.document": {
      nodes: {
        document: Record<string, never>;
      };
    };
  }
}

export const DocumentPlugin = {
  id: PLUGIN_ID,
  name: "document",
  nodes: {
    [NODES.DOCUMENT]: {
      component: DocumentView,
      schema: DocumentFileSchema,
      actionButtons: [
        {
          id: "open-document",
          icon: {
            type: "lucide",
            value: "FilePlus",
          },
          action: () => handleCreateDocument(NODES.DOCUMENT),
        },
      ],
      slots: {
        sidebar: DocumentSidebar,
      },
    },
  },
} satisfies Plugin;
