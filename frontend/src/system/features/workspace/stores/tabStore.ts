import { createStore, type StateCreator, type StoreApi } from "zustand";
import type { HistoryEntry } from "../types/navigation";

export type TabStore = StoreApi<NavigationSlice>;

export const createTabStore = () =>
  createStore<NavigationSlice>((...a) => ({
    ...createNavigationSlice(...a),
  }));

export interface NavigationSlice {
  history: HistoryEntry[];
  currentIndex: number;

  getCurrentEntry: () => HistoryEntry;
  navigate: (entry: HistoryEntry) => void;
  forward: () => void;
  back: () => void;
}

const createNavigationSlice: StateCreator<
  NavigationSlice,
  [],
  [],
  NavigationSlice
> = (set, get) => ({
  history: [],
  currentIndex: 0,

  getCurrentEntry: () => get().history[get().currentIndex],
  navigate: (entry) =>
    set((state) => {
      const history = state.history.slice(0, state.currentIndex + 1);
      history.push(entry);
      return { history: history, currentIndex: state.history.length - 1 };
    }),
  forward: () =>
    set((state) => {
      if (state.currentIndex + 1 > state.history.length - 1) return state;

      return {
        currentIndex: state.currentIndex + 1,
      };
    }),
  back: () =>
    set((state) => {
      if (state.currentIndex === 0) return state;

      return {
        currentIndex: state.currentIndex - 1,
      };
    }),
});
