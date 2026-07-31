import { createNodeBindings } from "@system/entry/categories/node/core/utils/createNodeBindings";
import { TYPE } from "./identity";
import { createStore } from "./store";
import type { NodeDefinition } from "@system/entry/categories/node/core/types";
import { createController } from "./controller";

export const definition = {
  type: TYPE,
  createEntryStore: createStore,
  createController: createController,
} satisfies NodeDefinition;

export const { useStore, useApi } = createNodeBindings(definition);
