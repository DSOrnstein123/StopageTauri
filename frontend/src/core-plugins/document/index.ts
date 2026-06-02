import { DocumentFileSchema } from "./schemas/documentSchema";
import DocumentSidebar from "./components/DocumentSidebar";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";
import { PLUGIN_ID } from "./constants";
import type { Plugin } from "@system/registries/plugin";

export { DocumentView, DocumentSidebar };

export const DocumentPlugin: Plugin = {
  id: PLUGIN_ID,
  name: "document",
  nodes: {
    "core.document": {
      component: DocumentView,
      schema: DocumentFileSchema,
      actionButtons: [
        {
          id: "open-document",
          icon: {
            type: "lucide",
            value: "FilePlus",
          },
          action: () => handleCreateDocument(DocumentPlugin.id),
        },
      ],
      slots: {
        sidebar: DocumentSidebar,
      },
    },
  },
};
