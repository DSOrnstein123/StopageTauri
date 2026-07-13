import { Editor } from "@system/lib/tiptap";
import { createContext, useContext } from "react";

export type SetEditorRef = (editor: Editor | null) => void;

export interface DocumentContentContextType {
  setEditorRef: SetEditorRef;
}

export const DocumentContentContext =
  createContext<DocumentContentContextType | null>(null);

export const useDocumentContentContext = () => {
  const context = useContext(DocumentContentContext);
  if (!context)
    throw new Error("Must use useDocumentContentContext inside NodeProvider");
  return context;
};
