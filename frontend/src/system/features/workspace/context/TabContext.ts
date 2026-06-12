import { createContext, useContext } from "react";

export interface ITabContext {
  tabId: string;
  id: string;
  isActive: boolean;
  setTitle: (newTitle: string) => void;
}

export const TabContext = createContext<ITabContext | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("Must use useTabContext inside TabProvider");
  return context;
};
