import { createContext, useContext } from "react";
import type { DocumentNodeController } from "../controller";

export type DocumentContext = DocumentNodeController;

export const DocumentContext = createContext<DocumentContext | null>(null);

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error("Must use useDocumentContext inside DocumentProvider");
  return context;
};
