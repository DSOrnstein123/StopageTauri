import { createContext, useContext as useReactContext } from "react";
import type { EntryApi } from "@system/plugin-manager/plugin";

export interface Context {
  entryId: string;
  entryApi?: EntryApi<unknown>;
}

export const Context = createContext<Context | null>(null);

export const useContext = () => {
  const context = useReactContext(Context);
  if (!context)
    throw new Error("Must use useAuxiliaryContext inside AuxiliaryProvider");
  return context;
};
