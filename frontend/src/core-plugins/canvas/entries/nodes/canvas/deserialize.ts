import type { Node as XyFlowNode, Edge as XyFlowEdge } from "@xyflow/react";
import type { Edge, Node } from "./schema";

export const deserializeNodes = (nodes: Node[]): XyFlowNode[] => {
  return nodes.map((node) => {
    return {
      id: node.id,
      type: node.type,
      position: { ...node.position },
      style: {
        height: node.size.height,
        width: node.size.width,
      },
      data: { ...node.data },
    };
  });
};

export const deserializeEdges = (edges: Edge[]): XyFlowEdge[] => {
  return edges.map((edge) => {
    return {
      id: edge.id,
      type: edge.type,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    };
  });
};
