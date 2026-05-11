import type { KeyboardEvent } from "react";
import { useNodeContext } from "../context/NodeContext";
import useRenameNode from "../hooks/useRenameNode";

const NodeNameInput = ({
  className,
  onKeyDown,
}: {
  className?: string;
  onKeyDown?: (event: KeyboardEvent) => void;
}) => {
  const { id } = useNodeContext();
  const { name, updateName, handleBlur } = useRenameNode(id);

  return (
    <input
      className={`${className} outline-0`}
      value={name}
      onChange={(event) => {
        updateName(event.target.value);
      }}
      onKeyDown={onKeyDown}
      onBlur={handleBlur}
      spellCheck={false}
    />
  );
};

export default NodeNameInput;
