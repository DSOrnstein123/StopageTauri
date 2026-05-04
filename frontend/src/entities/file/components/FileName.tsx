import { useEffect, useRef, type KeyboardEvent } from "react";
import useFileName from "../hooks/useFileName";
import { useTabContext } from "@/shared/tab-context/TabContext";
import { useFileContext } from "./context/FileContext";

const FileName = ({
  onKeyDown,
}: {
  onKeyDown: (e: KeyboardEvent<HTMLHeadingElement>) => void;
}) => {
  const { id } = useFileContext();
  const { setTitle } = useTabContext();
  const { currentName, handleInput, handleBlur } = useFileName(id, setTitle);

  const h1Ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (h1Ref.current && h1Ref.current.textContent !== currentName) {
      h1Ref.current.textContent = currentName;
    }
  }, [currentName]);

  return (
    <div className="relative mb-2">
      <h1
        ref={h1Ref}
        contentEditable
        spellCheck={false}
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        className="mb-4 text-5xl font-bold outline-none"
      />
      {!currentName && (
        <span className="pointer-events-none absolute top-0 left-0 text-4xl font-bold text-gray-400">
          Name
        </span>
      )}
    </div>
  );
};

export default FileName;
