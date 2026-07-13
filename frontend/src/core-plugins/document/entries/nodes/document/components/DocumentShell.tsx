import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { Editor } from "@system/lib/tiptap";
import DocumentContentProvider from "../context/DocumentContentProvider";
import NodeNameInput from "@system/features/node/components/NodeNameInput";

const DocumentShell = ({
  header,
  children,
}: {
  header?: ReactNode;
  children: ReactNode;
}) => {
  const editorRef = useRef<Editor | null>(null);
  const setEditorRef = (editor: Editor | null) => {
    editorRef.current = editor;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      editorRef.current?.commands.focus("start");
    }
  };

  return (
    <div className="flex h-full w-full justify-center overflow-auto px-10">
      <div className="relative h-full w-full max-w-187.5">
        <div className="text-5xl font-bold" onKeyDown={handleKeyDown}>
          {header || <NodeNameInput />}
        </div>

        <DocumentContentProvider value={{ setEditorRef: setEditorRef }}>
          {children}
        </DocumentContentProvider>
      </div>
    </div>
  );
};

export default DocumentShell;
