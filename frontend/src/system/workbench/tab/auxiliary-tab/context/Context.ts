import type { EntryApi } from "@system/plugin-manager/plugin";
import type { HistoryEntry } from "@system/workbench/tab/types/navigation";
import { createContext, useContext as useReactContext } from "react";
import type { StoreApi } from "zustand";

export interface Context {
  entryMetadata: HistoryEntry;
  entryStore: StoreApi<unknown>;
  entryApi: EntryApi<unknown>;
}

export const Context = createContext<Context | null>(null);

export const useContext = () => {
  const context = useReactContext(Context);
  if (!context)
    throw new Error(
      "Must use useAuxiliaryTabContext inside AuxiliaryTabProvider",
    );
  return context;
};
