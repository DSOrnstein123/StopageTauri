import {
  createStore as createZustandStore,
  type StateCreator,
  type StoreApi,
} from "zustand";
import type { HistoryEntry } from "../types/navigation";

export type EntryTabStore = StoreApi<NavigationSlice>;

export const createStore = () =>
  createZustandStore<NavigationSlice>((...a) => ({
    ...createNavigationSlice(...a),
  }));

type EntryStatus = "idle" | "loading" | "ready";

export interface NavigationSlice {
  history: HistoryEntry[];
  currentIndex: number;
  entryStatus: EntryStatus;

  getCurrentEntry: () => HistoryEntry;
  setEntryStatus: (entryStatus: EntryStatus) => void;
}

const createNavigationSlice: StateCreator<
  NavigationSlice,
  [],
  [],
  NavigationSlice
> = (set, get) => ({
  history: [],
  currentIndex: 0,
  entryStatus: "idle",

  getCurrentEntry: () => get().history[get().currentIndex],
  setEntryStatus: (entryStatus) => set({ entryStatus: entryStatus }),
});
