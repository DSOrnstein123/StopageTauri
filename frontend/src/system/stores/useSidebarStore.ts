import type { NodeType } from "@system/registries/plugin";
import { create } from "zustand";

interface SidebarStore {
  type: NodeType | null;

  setType: (type: NodeType | null) => void;
}

const createSidebarStore = () =>
  create<SidebarStore>((set) => ({
    type: null,

    setType: (type) => set({ type: type }),
  }));

export const useRightSidebarStore = createSidebarStore();
export const useLeftSidebarStore = createSidebarStore();
