import { createContext, useContext } from "react";

export interface INodeContext {
  id: string;
}

export const NodeContext = createContext<INodeContext | null>(null);

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (!context) throw new Error("Must use useNodeContext inside PanelProvider");
  return context;
};
