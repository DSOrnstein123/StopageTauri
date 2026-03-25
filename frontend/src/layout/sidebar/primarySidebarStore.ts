import { create } from "zustand";

interface PrimarySidebarStore {
  selectedId: string;
  setSelectedId: (id: string) => void;
}

export const usePrimarySidebarStore = create<PrimarySidebarStore>((set) => ({
  selectedId: "",

  setSelectedId: (id) => set({ selectedId: id }),
}));
