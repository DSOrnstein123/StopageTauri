import { useRef, type KeyboardEvent } from "react";
import DocumentContent from "../tiptap/DocumentContent";
import DocumentTitle from "./DocumentTitle";
import { Editor } from "@tiptap/react";

const Page = () => {
  const editorRef = useRef<Editor | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      editorRef.current?.commands.focus("start");
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full justify-center p-10">
      <div className="relative h-full w-full max-w-187.5">
        <DocumentTitle onKeyDown={handleKeyDown} />
        <DocumentContent editorRef={editorRef} />
      </div>
    </div>
  );
};

export default Page;
