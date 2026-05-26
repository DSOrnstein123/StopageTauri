import { DocumentFileSchema } from "./schemas/documentSchema";
import type { Plugin } from "@system/registries/plugin";
import DocumentSidebar from "./components/DocumentSidebar";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";

export { DocumentView, DocumentSidebar };

export const DocumentPlugin: Plugin = {
  id: "core.document",
  name: "document" as const,

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
