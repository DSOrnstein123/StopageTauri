import type { NodeConfig } from "@system/entry/categories/node/core/types";
import { View } from "./View";
import createCanvas from "./createCanvas";
import { TYPE } from "./identity";
import { createStore } from "./store";
import { createController } from "./controller";
import { createNodeBindings } from "@system/entry/categories/node/core/utils/createNodeBindings";

export const config = {
  type: TYPE,
  view: View,
  createEntryStore: createStore,
  createController: createController,
  actionButtons: [
    {
      id: "open-canvas",
      icon: {
        type: "lucide",
        value: "Workflow",
      },
      action: createCanvas,
    },
  ],
} satisfies NodeConfig;

export const { useStore, useApi } = createNodeBindings(config);
