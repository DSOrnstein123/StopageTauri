import { useStore } from "zustand";
import { useTabContext } from "../context/TabContext";
import { emptyTabStore } from "..";
import type { EntryStoreMap, EntryType } from "@system/plugin-manager/plugin";

export const useCurrentStore = <E extends EntryType, T>(
  expectedType: EntryType,
  selector: (state: EntryStoreMap<E>) => T,
) => {
  const tab = useTabContext();
  return useStore(tab.getEntryStore(expectedType) ?? emptyTabStore, selector);
};
