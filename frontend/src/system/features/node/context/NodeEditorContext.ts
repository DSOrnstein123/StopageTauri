import { Editor } from "@system/lib/tiptap";
import { createContext, useContext } from "react";

export type SetEditorRef = (editor: Editor | null) => void;

export interface NodeEditorContextType {
  setEditorRef: SetEditorRef;
}

export const NodeEditorContext = createContext<NodeEditorContextType | null>(
  null,
);

export const useNodeEditorContext = () => {
  const context = useContext(NodeEditorContext);
  if (!context)
    throw new Error("Must use useNodeEditorContext inside NodeProvider");
  return context;
};
