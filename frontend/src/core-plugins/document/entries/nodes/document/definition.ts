import type { NodeConfig } from "@system/entry/categories/node/core/types";
import DocumentView from "./components/DocumentView";
import { createDocumentController } from "./controller";
import handleCreateDocument from "./handlers/handleCreateDocument";
import createDocumentStore from "./stores/createDocumentStore";
import { DataSchema } from "./schemas";

export const TYPE = "document" as const;
export type TYPE = typeof TYPE;

export const config = {
  view: DocumentView,
  schema: DataSchema,
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
