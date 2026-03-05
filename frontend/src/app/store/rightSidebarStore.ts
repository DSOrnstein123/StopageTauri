import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SidebarType } from "../components/sidebar/sidebarComponentList";

interface RightSidebarState {
  width: number;
  type: SidebarType;
  toggle: boolean;

  setWidth: (width: number) => void;
  setType: (type: SidebarType) => void;
}

const useRightSidebarStore = create<
  RightSidebarState,
  [["zustand/persist", RightSidebarState]]
>(
  persist(
    (set) => ({
      width: 100,
      toggle: false,
      type: "none",

      setWidth: (newWidth) => set({ width: newWidth }),
      setType: (type) => set({ type: type }),
    }),
    { name: "right-sidebar-storage" },
  ),
);

export default useRightSidebarStore;
