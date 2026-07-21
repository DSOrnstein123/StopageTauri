import type { NodeType } from "@system/plugin-manager/plugin";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RightSidebarState {
  width: number;
  type: NodeType | null;
  toggle: boolean;

  setWidth: (width: number) => void;
  setType: (type: NodeType) => void;
}

const useRightSidebarStore = create<
  RightSidebarState,
  [["zustand/persist", RightSidebarState]]
>(
  persist(
    (set) => ({
      width: 100,
      toggle: false,
      type: null,

      setWidth: (newWidth) => set({ width: newWidth }),
      setType: (type) => set({ type: type }),
    }),
    { name: "right-sidebar-storage" },
  ),
);

export default useRightSidebarStore;
