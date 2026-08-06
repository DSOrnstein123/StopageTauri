import { useStore } from "zustand";
import useTab from "./useTab";

const useCurrentEntry = () => {
  const tab = useTab();

  if (tab.kind !== "entry") {
    throw new Error("Tab is not entry tab");
  }

  return useStore(tab.store, (state) => state.getCurrentEntry());
};

export default useCurrentEntry;
