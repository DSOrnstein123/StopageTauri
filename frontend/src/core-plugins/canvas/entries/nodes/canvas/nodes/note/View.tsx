import { cn } from "@system/lib/tailwind-css/utils";
import { type NodeProps, NodeResizer } from "@xyflow/react";
import { memo, useCallback, type ChangeEvent } from "react";
import ConnectionPoint from "../../components/ConnectionPoint";
import { Card } from "@system/shared/ui/shadcn/card";
import { useStore } from "../../definition";
import type { Node } from "./types";

export const View = memo(({ id, data, selected }: NodeProps<Node>) => {
  const isEditing = useStore((state) => state.editingNodeId === id);
  const setNodes = useStore((state) => state.setNodes);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        {isEditing ? (
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
});
