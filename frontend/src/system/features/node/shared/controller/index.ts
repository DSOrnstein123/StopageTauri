import { BaseController } from "@system/features/workspace/classes/baseController";
import type { StoreApi } from "zustand";

export class NodeController extends BaseController {
  get api() {
    return { ...this.nodeApi() };
  }

  protected nodeApi() {
    return {};
  }
}

export abstract class NodeStoreController<
  Slice extends object,
> extends NodeController {
  protected store?: StoreApi<Slice>;

  override setStore(store: StoreApi<Slice>) {
    this.store = store;
  }
}
