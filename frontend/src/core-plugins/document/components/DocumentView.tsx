import { useEffect, useRef, type KeyboardEvent } from "react";
import { Editor } from "@tiptap/react";
import DocumentDetail from "./DocumentDetail";
import NodeNameHeader from "@system/features/node/components/NodeNameHeader";
import { useRightSidebarStore } from "@system/stores/useSidebarStore";
import { DOCUMENT_NODE } from "../constants";

const DocumentView = () => {
  const editorRef = useRef<Editor | null>(null);
  const setType = useRightSidebarStore((state) => state.setType);

  useEffect(() => {
    setType(DOCUMENT_NODE);

    return () => setType(null);
  }, [setType]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      editorRef.current?.commands.focus("start");
    }
  };

  return (
    <div className="flex h-full w-full justify-center overflow-auto px-10">
      <div className="relative h-full w-full max-w-187.5">
        <NodeNameHeader onKeyDown={handleKeyDown} />
        <DocumentDetail editorRef={editorRef} />
      </div>
    </div>
  );
};

export default DocumentView;
