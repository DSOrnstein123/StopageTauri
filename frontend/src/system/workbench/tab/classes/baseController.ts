import type { StoreApi } from "zustand";

export abstract class BaseController {
  abstract readonly api?: unknown;
  setStore?(store: StoreApi<unknown>): void;

  destroy() {}
}
