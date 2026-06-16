import { createContext, useContext } from "react";

export interface TabContext {
  tabId: string;
  id: string;
  setTitle: (newTitle: string) => void;
}

export const TabContext = createContext<TabContext | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("Must use useTabContext inside TabProvider");
  return context;
};
