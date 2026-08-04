import { BaseController } from "@system/workbench/tab/classes/baseController";
import type { StoreApi } from "zustand";

export class NodeController extends BaseController {
  readonly nodeId: string;

  constructor(nodeId: string) {
    super();
    this.nodeId = nodeId;
  }

  readonly api = {
    ...this.nodeApi(),
  };

  protected nodeApi() {
    return {};
  }
}

export abstract class NodeStoreController<
  Store extends object,
> extends NodeController {
  protected store?: StoreApi<Store>;

  setStore(store: StoreApi<Store>) {
    this.store = store;
  }
}
