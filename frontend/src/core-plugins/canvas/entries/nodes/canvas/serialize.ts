import type { Node as XyFlowNode, Edge as XyFlowEdge } from "@xyflow/react";
import type { Edge, Node } from "./schema";

export const serializeNodes = (nodes: XyFlowNode[]): Node[] => {
  return nodes.map((node) => {
    const type = node.type;

    if (!type) {
      throw new Error(`Canvas node "${node.id}" has no type`);
    }

    const height = node.style?.height;
    const width = node.style?.width;

    if (typeof height !== "number" || typeof width !== "number") {
      throw new Error(`Canvas node "${node.id}" has invalid size`);
    }

    return {
      id: node.id,
      type: type,
      position: { ...node.position },
      size: {
        height: height,
        width: width,
      },
      data: node.data,
    };
  });
};

export const serializeEdges = (edges: XyFlowEdge[]): Edge[] => {
  return edges.map((edge) => {
    const type = edge.type;

    if (!type) {
      throw new Error(`Canvas edge "${edge.id}" has no type`);
    }

    const sourceHandle = edge.sourceHandle;

    if (!sourceHandle) {
      throw new Error(`Canvas edge "${edge.id}" has no sourceHandle`);
    }

    const targetHandle = edge.targetHandle;

    if (!targetHandle) {
      throw new Error(`Canvas edge "${edge.id}" has no targetHandle`);
    }

    return {
      id: edge.id,
      type: type,
      source: edge.source,
      target: edge.target,
      sourceHandle: sourceHandle,
      targetHandle: targetHandle,
    };
  });
};
