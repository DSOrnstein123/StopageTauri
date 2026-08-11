import { createContext, useContext as useReactContext } from "react";
import type { AuxiliaryTab } from "../AuxiliaryTab";

export interface Context {
  auxiliaryTab: AuxiliaryTab;
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
