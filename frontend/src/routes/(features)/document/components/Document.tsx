import { useRef, type KeyboardEvent } from "react";
import DocumentTitle from "./DocumentTitle";
import { Editor } from "@tiptap/react";
import DocumentContent from "../../../../app/components/page/DocumentContent";

const Document = () => {
  const editorRef = useRef<Editor | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      editorRef.current?.commands.focus("start");
    }
  };

  return (
    <div className="flex h-full w-full justify-center overflow-auto p-10">
      <div className="relative h-full w-full max-w-187.5">
        <DocumentTitle onKeyDown={handleKeyDown} />
        <DocumentContent editorRef={editorRef} />
      </div>
    </div>
  );
};

export default Document;
