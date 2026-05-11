import { create } from "zustand";

interface ISidebarStore {
  type: string;

  setType: (type: string) => void;
}

const createSidebarStore = () =>
  create<ISidebarStore>((set) => ({
    type: "document",

    setType: (type) => set({ type: type }),
  }));

export const useRightSidebarStore = createSidebarStore();
export const useLeftSidebarStore = createSidebarStore();
