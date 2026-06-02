import { DocumentFileSchema } from "./schemas/documentSchema";
import type { Plugin } from "@system/registries/plugin";
import DocumentSidebar from "./components/DocumentSidebar";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";
import { PLUGIN_ID } from "./constants";

export { DocumentView, DocumentSidebar };

export const DocumentPlugin: Plugin = {
  id: PLUGIN_ID,
  name: "document",

  onRegister: (ctx) => {
    ctx.register(DocumentPlugin.name, {
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
    });
  },
};
