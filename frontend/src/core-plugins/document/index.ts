import { DocumentFileSchema } from "./schemas/documentSchema";
import DocumentSidebar from "./components/DocumentTOCAuxiliary";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";
import { NODES, PLUGIN_ID } from "./constants";
import type { PluginManifest } from "@system/registries/plugin";
import type { ComponentType } from "react";
import type { DocumentNodeApi } from "./types/api";
import { DocumentNodeController } from "./controller";

export { DocumentView, DocumentSidebar };

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.document": {
      nodes: {
        document: {
          slots: {
            emptyPlaceholder?: ComponentType<{ data?: unknown }>;
          };
          api: DocumentNodeApi;
          controller: typeof DocumentNodeController;
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
      controller: DocumentNodeController,
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
} satisfies PluginManifest;
