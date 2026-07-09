import type { StoreApi } from "zustand";
import type { NavigationSlice } from "../stores/tabStore";

export abstract class BaseController {
  abstract readonly api?: unknown;
  setStore?(store: StoreApi<unknown>): void;

  destroy() {}
}

export abstract class StoreController<
  Slice extends object,
> extends BaseController {
  protected store?: StoreApi<NavigationSlice & Slice>;

  override setStore(store: StoreApi<NavigationSlice & Slice>) {
    this.store = store;
  }
}
