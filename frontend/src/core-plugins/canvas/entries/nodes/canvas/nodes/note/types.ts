import type { Node as XyFlowNode } from "@xyflow/react";
import type { TYPE } from "./identity";

export type Node = XyFlowNode<{ text: string; isEditing?: boolean }, TYPE>;
