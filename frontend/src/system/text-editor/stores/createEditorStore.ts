import { createStore } from "zustand";
import type { TableOfContentData } from "@system/lib/tiptap/extension-table-of-contents";

export interface EditorStore {
  tocContent: TableOfContentData | null;

  setTOCContent: (tocContent: TableOfContentData) => void;
}

export const createEditorStore = () =>
  createStore<EditorStore>((set) => ({
    tocContent: null,

    setTOCContent: (tocContent) => set({ tocContent: tocContent }),
  }));
