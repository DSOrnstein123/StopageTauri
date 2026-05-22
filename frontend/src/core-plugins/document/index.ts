import { DocumentFileSchema } from "./schemas/documentSchema";
import type { Plugin } from "@system/registries/plugin";
import DocumentSidebar from "./components/DocumentSidebar";
import DocumentView from "./components/DocumentView";
import handleCreateDocument from "./handlers/handleCreateDocument";

export { DocumentView, DocumentSidebar };

export const documentPlugin: Plugin = {
  id: "core.document",
  name: "document" as const,

  onRegister: (ctx) => {
    ctx.register(documentPlugin.name, {
      component: DocumentView,
      schema: DocumentFileSchema,
      actionButtons: [
        {
          id: "open-document",
          icon: {
            type: "lucide",
            value: "FilePlus",
          },
          action: handleCreateDocument,
        },
      ],
      slots: {
        sidebar: DocumentSidebar,
      },
    });
  },
};
