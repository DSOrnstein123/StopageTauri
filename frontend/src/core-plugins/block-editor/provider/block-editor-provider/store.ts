import type { TableOfContentData } from "@tiptap/extension-table-of-contents";
import { createStore } from "zustand";
import type { HighlightItem } from "./extensions/semantic-highlight/getHighlights";

export interface EditorStore {
  tocContent: TableOfContentData | null;
  highlights: HighlightItem[];

  setTOCContent: (tocContent: TableOfContentData) => void;
  setHighlights: (highlights: HighlightItem[]) => void;
}

export const createEditorStore = () =>
  createStore<EditorStore>((set) => ({
    tocContent: null,
    highlights: [],

    setTOCContent: (tocContent) => set({ tocContent: tocContent }),
    setHighlights: (highlights) => set({ highlights: highlights }),
  }));
