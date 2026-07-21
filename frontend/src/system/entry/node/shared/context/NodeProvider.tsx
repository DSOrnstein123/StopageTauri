import type { ReactNode } from "react";
import { NodeContext, type INodeContext } from "./NodeContext";

const NodeProvider = ({
  props,
  children,
}: {
  props: INodeContext;
  children: ReactNode;
}) => {
  return <NodeContext.Provider value={props}>{children}</NodeContext.Provider>;
};

export default NodeProvider;
