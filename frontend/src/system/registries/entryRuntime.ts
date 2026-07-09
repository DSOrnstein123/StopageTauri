import type { StoreApi } from "zustand";
import type { BaseController } from "@system/features/workspace/classes/baseController";

export class EntryRuntime {
  readonly store?: StoreApi<unknown>;
  #controller?: BaseController;

  constructor(store?: StoreApi<unknown>, controller?: BaseController) {
    this.store = store;
    this.#controller = controller;
    controller?.setStore?.(store!);
  }

  get api() {
    return this.#controller?.api;
  }

  destroy() {
    this.#controller?.destroy();
  }
}
