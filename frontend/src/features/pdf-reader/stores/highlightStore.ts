import { create } from "zustand";

interface HighlightState {
  text: string;
  setText: (newText: string) => void;
}

const useHighlightStore = create<HighlightState>((set) => ({
  text: "",
  setText: (newText) => set({ text: newText }),
}));

export default useHighlightStore;
