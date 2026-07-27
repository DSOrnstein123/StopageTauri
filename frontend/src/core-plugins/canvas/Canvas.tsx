import {
  ReactFlow,
  addEdge,
  type Connection,
  ConnectionMode,
  MarkerType,
  SelectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NoteNode from "./components/NoteNode";
import GroupNode from "./components/GroupNode";
import { useCallback } from "react";
import { useFlowStore } from "@/features/canvas/flowStore";
import FloatingEdge from "./components/FloatingEdge";
import Controller from "./components/controller/Controller";
import { ZoomSlider } from "@/shared/components/shadcn/zoom-slider";

const nodeTypes = { notenode: NoteNode, groupnode: GroupNode };
const edgeTypes = { floating: FloatingEdge };

const Canvas = () => {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const tool = useFlowStore((state) => state.tool);
  const setTool = useFlowStore((state) => state.setTool);
  const setEdges = useFlowStore((state) => state.setEdges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onNodeDoubleClick = useFlowStore((state) => state.onNodeDoubleClick);

  const panOnDrag = [2];

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            type: "floating",
            style: {
              strokeWidth: "3px",
              stroke: "oklab(0.21 0.00164225 -0.00577088 / 0.2)",
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 8,
              height: 8,
            },
          },
          edges,
        ),
      );
    },
    [setEdges],
  );

  const handleMouseDown = () => {
    setTool("pan");
  };

  return (
    <div className="h-full w-full">
      <ReactFlow
        className={tool === "select" ? "cursor-default" : ""}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onConnect={onConnect}
        selectionOnDrag
        panOnDrag={panOnDrag}
        connectionMode={ConnectionMode.Loose}
        selectionMode={SelectionMode.Partial}
        proOptions={{ hideAttribution: true }}
        onMouseDownCapture={handleMouseDown}
      >
        <Controller />
        <ZoomSlider
          style={{
            top: "auto",
            left: "auto",
            bottom: "-4px",
            right: "-4px",
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
