import { DocumentFileSchema } from "./schemas/documentSchema";
import DocumentSidebar from "./components/DocumentSidebar";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";
import { NODES, PLUGIN_ID } from "./constants";
import type { Plugin } from "@system/registries/plugin";
import type { ComponentType } from "react";

export { DocumentView, DocumentSidebar };

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.document": {
      nodes: {
        document: {
          slots: {
            emptyPlaceholder: ComponentType<{ data?: unknown }>;
          };
        };
      };
    };
  }
}

export const DocumentPlugin = {
  id: PLUGIN_ID,
  name: "Document",
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
