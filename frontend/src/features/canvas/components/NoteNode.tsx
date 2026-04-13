import { cn } from "@/shared/lib/utils";
import { type Node, type NodeProps, NodeResizer } from "@xyflow/react";
import React, { memo, useCallback } from "react";
import ConnectionPoint from "./ConnectionPoint";
import { useFlowStore } from "@/features/canvas/flowStore";
import { Card } from "@/shared/components/shadcn/card";

type NoteNodeProps = Node<{ text: string; isEditing?: boolean }, "notenode">;

const NoteNode = ({ id, data, selected }: NodeProps<NoteNodeProps>) => {
  const setNodes = useFlowStore((state) => state.setNodes);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, text: e.target.value } }
            : node,
        ),
      );
    },
    [setNodes, id],
  );

  const handleOnBlur = () => {
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, isEditing: false },
      })),
    );
  };

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: "8px",
          opacity: 0,
        }}
        handleStyle={{
          width: "10px",
          height: "10px",
          opacity: 0,
        }}
        minWidth={100}
        minHeight={64}
      />
      <Card
        onBlur={handleOnBlur}
        className={cn(
          "border-primary/20 relative flex h-full w-full rounded-md border-2 p-4 leading-7 shadow-none",
          selected
            ? "border-black shadow-[inset_0_0_0_0.5px_#000] outline-[0.5px] outline-black"
            : "",
        )}
      >
        {data.isEditing ? (
          <textarea
            className="border-non resize-none outline-none"
            autoFocus
            onChange={handleOnChange}
          />
        ) : (
          data.text
        )}
        <ConnectionPoint />
      </Card>
    </>
  );
};

export default memo(NoteNode);
