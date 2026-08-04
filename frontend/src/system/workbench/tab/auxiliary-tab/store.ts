import { createStore as createZustandStore, type StoreApi } from "zustand";

export type AuxiliaryTabStore = StoreApi<AuxiliaryTabStoreState>;

export interface AuxiliaryTabStoreState {
  activeSegment: string | null;
}

export const createStore = () =>
  createZustandStore<AuxiliaryTabStoreState>(() => ({
    activeSegment: null,
  }));
