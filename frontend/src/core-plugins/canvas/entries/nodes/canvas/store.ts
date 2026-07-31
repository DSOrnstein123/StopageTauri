import { createStore as createZustandStore } from "zustand";
import {
  applyNodeChanges,
  type Edge,
  type Node,
  type NodeChange,
} from "@xyflow/react";

export interface Store {
  nodes: Node[];
  edges: Edge[];
  tool: "select" | "pan";
  editingNodeId: string | null;

  setTool: (tool: "select" | "pan") => void;
  setNodes: (updater: (nodes: Node[]) => Node[]) => void;
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void;
  addNode: (node: Node) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onNodeDoubleClick: (event: React.MouseEvent, node: Node) => void;
  setEditingNodeId: (id: string | null) => void;
}

export const createStore = () =>
  createZustandStore<Store>((set, get) => ({
    nodes: [],
    edges: [],
    // [
    //   {
    //     id: "2",
    //     source: "1",
    //     sourceHandle: "bottom",
    //     target: "4",
    //     targetHandle: "top",
    //     type: "floating",
    //     style: {
    //       strokeWidth: "2px",
    //       stroke: "oklab(0.21 0.00164225 -0.00577088 / 0.2)",
    //     },
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //       width: 8,
    //       height: 8,
    //     },
    //   },
    //   {
    //     id: "3",
    //     source: "4",
    //     sourceHandle: "right",
    //     target: "2",
    //     targetHandle: "left",
    //     type: "floating",
    //     style: {
    //       strokeWidth: "2px",
    //       stroke: "oklab(0.21 0.00164225 -0.00577088 / 0.2)",
    //     },
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //       width: 8,
    //       height: 10,
    //     },
    //   },
    // ],
    tool: "select",
    editingNodeId: null,

    setTool: (tool) => set({ tool }),

    setNodes: (updater) => set((state) => ({ nodes: updater(state.nodes) })),
    setEdges: (updater) => set((state) => ({ edges: updater(state.edges) })),

    addNode: (node) =>
      set((state) => ({
        nodes: [...state.nodes, node],
      })),

    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },

    onNodeDoubleClick: (_, node) => {
      get().setEditingNodeId(node.id);
    },

    setEditingNodeId: (id) => set({ editingNodeId: id }),
  }));
