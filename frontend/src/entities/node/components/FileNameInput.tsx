import type { KeyboardEvent } from "react";
import { useFileContext } from "../context/FileContext";
import useRenameFile from "../hooks/useRenameFile";

const FileNameInput = ({
  className,
  onKeyDown,
}: {
  className?: string;
  onKeyDown?: (event: KeyboardEvent) => void;
}) => {
  const { id } = useFileContext();
  const { name, updateName, handleBlur } = useRenameFile(id);

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

export default FileNameInput;
