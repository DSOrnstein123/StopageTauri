import { create } from "zustand";
import type { Deck } from "../types/flashcard.types";

interface DeckTreeState {
  draft: Deck | null;
  setDraft: (id: string, name: string) => void;
  clearDraft: () => void;

  treeFocusId: string | null;
  setTreeFocusId: (id: string | null) => void;
}

const useDeckTreeStore = create<DeckTreeState>((set) => ({
  draft: null,
  setDraft: (id, name) =>
    set((state) => ({
      draft: {
        id: id,
        name: name,
        parentId: state.treeFocusId,
      },
    })),
  clearDraft: () => set({ draft: null }),

  treeFocusId: null,
  setTreeFocusId: (id) => set({ treeFocusId: id }),
}));

export default useDeckTreeStore;
