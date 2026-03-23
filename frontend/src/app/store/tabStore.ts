import type { DefaultStateCreator } from "@/app/types/defaultStateCreator";
import { type Tab } from "@/app/types/tab.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabState extends TabSlice, ActiveTabSlice {}

interface TabSlice {
  tabs: Tab[];

  addTab: (route: string, title?: string) => void;
  removeTab: (id: string) => void;
  updateTabTitle: (id: string, title: string) => void;
  updateTabRoute: (id: string, route: string) => void;
}

const createTabSlice: DefaultStateCreator<TabState, TabSlice> = (set) =>
  ({
    tabs: [],

    addTab: (route, title) => {
      const id = Date.now().toString();
      const newTab: Tab = {
        id: id,
        title: title ? title : "",

        route: route,
      };

      set((state) => ({
        tabs: [...state.tabs, newTab],
        activeTabId: id,
      }));
    },
    removeTab: (id) => {
      set((state) => {
        const remainingTabs = state.tabs.filter((tab) => tab.id !== id);

        const newActiveTab =
          state.activeTabId === id
            ? remainingTabs.at(-1)?.id || null
            : state.activeTabId;

        return {
          tabs: remainingTabs,
          activeTabId: newActiveTab,
        };
      });
    },
    updateTabTitle: (id: string, title: string) =>
      set((state) => ({
        tabs: state.tabs.map((tab) =>
          tab.id === id ? { ...tab, title: title } : tab,
        ),
      })),
    updateTabRoute: (id: string, route: string) =>
      set((state) => ({
        tabs: state.tabs.map((tab) =>
          tab.id === id ? { ...tab, route: route } : tab,
        ),
      })),
  }) satisfies TabSlice;

interface ActiveTabSlice {
  activeTabId: string | null;

  setActiveTab: (id: string | null) => void;
}

const createActiveTabSlice: DefaultStateCreator<TabState, ActiveTabSlice> = (
  set,
) =>
  ({
    activeTabId: null,

    setActiveTab: (id) => set({ activeTabId: id }),
  }) satisfies ActiveTabSlice;

export const useTabStore = create<TabState>()(
  persist(
    (...args) => ({
      ...createActiveTabSlice(...args),
      ...createTabSlice(...args),
    }),
    { name: "tab-storage" },
  ),
);
