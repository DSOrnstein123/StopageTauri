import { useRef, type KeyboardEvent } from "react";
import FileName from "../../../entities/file/components/FileName";
import { Editor } from "@tiptap/react";
import DocumentDetail from "./DocumentDetail";

const Document = () => {
  const editorRef = useRef<Editor | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      editorRef.current?.commands.focus("start");
    }
  };

  return (
    <div className="flex h-full w-full justify-center overflow-auto p-10">
      <div className="relative h-full w-full max-w-187.5">
        <FileName onKeyDown={handleKeyDown} />
        <DocumentDetail editorRef={editorRef} />
      </div>
    </div>
  );
};

export default Document;
