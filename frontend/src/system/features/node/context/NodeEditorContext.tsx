import type { ReactNode } from "react";
import { NodeEditorContextType, NodeEditorContext } from "./NodeEditorContext";

const NodeEditorProvider = ({
  props,
  children,
}: {
  props: NodeEditorContextType;
  children: ReactNode;
}) => {
  return (
    <NodeEditorContext.Provider value={props}>
      {children}
    </NodeEditorContext.Provider>
  );
};

export default NodeEditorProvider;
