import type { IconData } from "@system/shared/schemas/iconData";
import { createContext, useContext } from "react";
import type { StoreApi } from "zustand";

export interface INodeContext {
  id: string;
  icon?: IconData;
  store?: StoreApi<unknown>;
  api?: unknown;
}

export const NodeContext = createContext<INodeContext | null>(null);

export const useNodeContext = () => {
  const context = useContext(NodeContext);

  if (!context) throw new Error("Must use useNodeContext inside NodeProvider");

  return context;
};
