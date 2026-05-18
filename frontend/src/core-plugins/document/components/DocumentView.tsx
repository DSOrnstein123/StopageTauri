import { useRef, type KeyboardEvent } from "react";
import { Editor } from "@tiptap/react";
import DocumentDetail from "./DocumentDetail";
import NodeName from "@system/domain/node/components/NodeName";

const DocumentView = () => {
  const editorRef = useRef<Editor | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      editorRef.current?.commands.focus("start");
    }
  };

  return (
    <div className="flex h-full w-full justify-center overflow-auto px-10">
      <div className="relative h-full w-full max-w-187.5">
        <NodeName onKeyDown={handleKeyDown} />
        <DocumentDetail editorRef={editorRef} />
      </div>
    </div>
  );
};

export default DocumentView;
