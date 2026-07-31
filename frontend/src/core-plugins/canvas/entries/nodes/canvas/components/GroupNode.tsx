import { cn } from "@system/lib/tailwind-css/utils";
import { type Node, type NodeProps } from "@xyflow/react";
import { memo } from "react";

type GroupNodeProps = Node<
  { label?: string; isSelected?: boolean },
  "groupnode"
>;

const GroupNode = ({ data }: NodeProps<GroupNodeProps>) => {
  return (
    <div
      className={cn(
        "bg-accent/50 border-primary/20 flex h-96 w-96 rounded-md border-2",
        data.isSelected ? "border-black outline-1 outline-black" : "",
      )}
    >
      <div className="bg-primary/10 h-8 rounded-tl-sm rounded-br-sm p-2 text-lg/3 font-medium">
        {data.label}
      </div>
    </div>
  );
};

export default memo(GroupNode);
