import type { NodeConfig } from "@system/entry/categories/node/core/types";
import { createDocumentController } from "./controller";
import handleCreateDocument from "./handlers/handleCreateDocument";
import createDocumentStore from "./stores/createDocumentStore";
import { DataSchema } from "./schema";
import View from "./View";
import { BlockEditorView } from "@core-plugins/block-editor";
import { TYPE } from "./identity";

export const config = {
  type: TYPE,
  view: () => <View EditorView={BlockEditorView} />,
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
  auxiliary: {
    segments: ["core.block-editor.highlight"],
  },
} satisfies NodeConfig;
