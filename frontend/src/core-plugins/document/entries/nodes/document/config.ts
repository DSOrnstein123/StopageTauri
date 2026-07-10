import type { NodeConfig } from "@system/registries/node";
import DocumentView from "./components/DocumentView";
import { createDocumentController } from "./controller";
import handleCreateDocument from "./handlers/handleCreateDocument";
import { DocumentFileSchema } from "./schemas/documentSchema";
import createDocumentStore from "./stores/createDocumentStore";

export const documentConfig = {
  view: DocumentView,
  schema: DocumentFileSchema,
  createController: createDocumentController,
  createEntryStore: createDocumentStore,
  actionButtons: [
    {
      id: "open-document",
      icon: {
        type: "lucide",
        value: "FilePlus",
      },
      action: () => handleCreateDocument(),
    },
  ],
  slots: {
    sidebar: {},
    emptyPlaceholder: {},
  },
} satisfies NodeConfig;
