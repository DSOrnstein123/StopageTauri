import { createContext, useContext } from "react";
import type { Tab } from "../BaseTab";

export const TabContext = createContext<Tab | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("Must use useTabContext inside TabProvider");
  return context;
};
