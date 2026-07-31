import {
  ReactFlow,
  addEdge,
  type Connection,
  ConnectionMode,
  MarkerType,
  SelectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import GroupNode from "./GroupNode";
import { useCallback } from "react";
import { useStore } from "../definition";
import FloatingEdge from "./FloatingEdge";
import Controller from "./controller/Controller";
import { ZoomSlider } from "@system/shared/ui/shadcn/zoom-slider";
import { PAN_ON_DRAG, ZOOM_SLIDER_STYLE } from "../constants";
import { cn } from "@system/lib/tailwind-css/utils";
import { NoteNodeView } from "../nodes/note";

const nodeTypes = { note: NoteNodeView, groupnode: GroupNode };
const edgeTypes = { floating: FloatingEdge };

const Canvas = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const tool = useStore((state) => state.tool);

  const setEdges = useStore((state) => state.setEdges);
  const setTool = useStore((state) => state.setTool);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onNodeDoubleClick = useStore((state) => state.onNodeDoubleClick);

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
        id="canvas"
        className={cn(
          "h-full w-full",
          tool === "select" ? "cursor-default" : "",
        )}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onConnect={onConnect}
        selectionOnDrag
        panOnDrag={PAN_ON_DRAG}
        connectionMode={ConnectionMode.Loose}
        selectionMode={SelectionMode.Partial}
        proOptions={{ hideAttribution: true }}
        onMouseDownCapture={handleMouseDown}
      >
        <Controller />
        <ZoomSlider style={ZOOM_SLIDER_STYLE} />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
