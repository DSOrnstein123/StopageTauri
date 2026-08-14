import { useStore as useZustandStore, type StoreApi } from "zustand";
import { useNodeContext } from "../context/NodeContext";
import type { NodeDefinition } from "../types";

type NodeBinding<D extends NodeDefinition> = StoreBinding<D> & ApiBinding<D>;

type StoreBinding<D extends NodeDefinition> = D extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEntryStore: (...args: any[]) => StoreApi<infer S>;
}
  ? {
      useStore: <T>(selector: (state: S) => T) => T;
    }
  : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {};
type StoreStateOf<D> = D extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEntryStore: (...args: any[]) => StoreApi<infer S>;
}
  ? S
  : never;

type ApiBinding<D extends NodeDefinition> = D extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createController: (...args: any[]) => any;
}
  ? {
      useApi: () => ApiOf<D>;
    }
  : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {};
type ApiOf<D> = D extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createController: (...args: any[]) => infer C;
}
  ? C extends { api: infer A }
    ? A
    : never
  : never;

export const createNodeBindings = <D extends NodeDefinition>(
  nodeDefinition: D,
): NodeBinding<D> => {
  const useRuntime = () => {
    const { api, store } = useNodeContext();

    return {
      api: api,
      store: store as StoreApi<StoreStateOf<D>> | undefined,
    };
  };

  const useStore = <T>(selector: (state: StoreStateOf<D>) => T): T => {
    const { store } = useRuntime();

    if (!store) {
      throw new Error(
        `Node "${nodeDefinition.type}" declares a Store, but its runtime has no Store`,
      );
    }

    return useZustandStore(store, selector);
  };

  const useApi = () => {
    const { api } = useRuntime();

    if (!api) {
      throw new Error(
        `Node "${nodeDefinition.type}" declares a Api, but its runtime has no Api`,
      );
    }

    return api;
  };

  const bindings: Record<string, unknown> = {};

  if (nodeDefinition.createEntryStore) {
    bindings.useStore = useStore;
  }

  if (nodeDefinition.createController) {
    bindings.useApi = useApi;
  }

  return bindings as NodeBinding<D>;
};
