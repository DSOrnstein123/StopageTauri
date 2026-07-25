import { useStore, type StoreApi } from "zustand";
import type { EditorStore } from "../store";

const useTOCContent = (store: StoreApi<EditorStore>) => {
  return useStore(store, (state) => state.tocContent);
};

export default useTOCContent;
