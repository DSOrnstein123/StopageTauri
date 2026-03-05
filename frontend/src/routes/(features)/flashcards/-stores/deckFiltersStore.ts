import { create } from "zustand";

interface DeckFilterState {
  search: string;

  setSearch: (search: string) => void;
}

const useDeckFiltersStore = create<DeckFilterState>((set) => ({
  search: "",

  setSearch: (search) => {
    set({ search: search });
  },
}));

export { useDeckFiltersStore };
