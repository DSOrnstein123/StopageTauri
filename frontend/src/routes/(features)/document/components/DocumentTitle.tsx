import { useEffect, useRef, type KeyboardEvent } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const DocumentTitle = ({
  onKeyDown,
}: {
  onKeyDown: (e: KeyboardEvent<HTMLHeadingElement>) => void;
}) => {
  const { title, handleInput } = useDocumentTitle();

  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (h1Ref.current && h1Ref.current.textContent !== title) {
      h1Ref.current.textContent = title;
    }
  }, [title]);

  return (
    <div className="relative mb-2">
      <h1
        ref={h1Ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={onKeyDown}
        className="text-4xl font-bold outline-none"
      />
      {!title && (
        <span className="pointer-events-none absolute top-0 left-0 text-4xl font-bold text-gray-400">
          Title
        </span>
      )}
    </div>
  );
};

export default DocumentTitle;
