import { create } from "zustand";

interface ISidebarStore {
  type: string | null;

  setType: (type: string | null) => void;
}

const createSidebarStore = () =>
  create<ISidebarStore>((set) => ({
    type: null,

    setType: (type) => set({ type: type }),
  }));

export const useRightSidebarStore = createSidebarStore();
export const useLeftSidebarStore = createSidebarStore();
