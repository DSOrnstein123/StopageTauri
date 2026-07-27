import { useStore as useZustandStore, type StoreApi } from "zustand";
import type { EditorStore } from "../store";

export const useStore = <T>(
  store: StoreApi<EditorStore>,
  selector: (state: EditorStore) => T,
) => {
  return useZustandStore(store, selector);
};
