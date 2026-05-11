import useFileName from "../hooks/useRenameFile";
import { useFileContext } from "../context/FileContext";
import FileNameInput from "./FileNameInput";
import type { KeyboardEvent } from "react";

const FileName = ({
  onKeyDown,
}: {
  onKeyDown: (event: KeyboardEvent) => void;
}) => {
  const { id } = useFileContext();
  const { name } = useFileName(id);

  return (
    <div className="relative mb-2">
      <FileNameInput
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

export default FileName;
