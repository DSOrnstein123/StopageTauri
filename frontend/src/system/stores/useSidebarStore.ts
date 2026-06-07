import { create } from "zustand";

interface SidebarStore {
  type: string | null;

  setType: (type: string | null) => void;
}

const createSidebarStore = () =>
  create<SidebarStore>((set) => ({
    type: null,

    setType: (type) => set({ type: type }),
  }));

export const useRightSidebarStore = createSidebarStore();
export const useLeftSidebarStore = createSidebarStore();
