import { useNodeContext } from "../context/NodeContext";
import useRenameNode from "../hooks/useRenameNode";
import NodeNameInput from "./NodeNameInput";
import type { KeyboardEvent } from "react";

const NodeName = ({
  onKeyDown,
}: {
  onKeyDown: (event: KeyboardEvent) => void;
}) => {
  const { id } = useNodeContext();
  const { name } = useRenameNode(id);

  return (
    <div className="relative mb-2">
      <NodeNameInput
        className="mb-4 text-5xl font-bold outline-none"
        onKeyDown={onKeyDown}
      />

      {!name && (
        <span className="pointer-events-none absolute top-1 left-0 text-5xl font-bold text-gray-400">
          Name
        </span>
      )}
    </div>
  );
};

export default NodeName;
