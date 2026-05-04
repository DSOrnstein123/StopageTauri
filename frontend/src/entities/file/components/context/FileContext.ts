import { createContext, useContext } from "react";

export interface IFileContext {
  id: string;
}

export const FileContext = createContext<IFileContext | null>(null);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) throw new Error("Must use useFileContext inside PanelProvider");
  return context;
};
