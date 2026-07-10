import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { Editor } from "@system/lib/tiptap";
import NodeNameHeader from "../../../../../../system/features/node/components/NodeNameHeader";
import { NodeEditorContext } from "../../../../../../system/features/node/context/NodeEditorContext";

const DocumentLayout = ({ children }: { children: ReactNode }) => {
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
        <NodeNameHeader onKeyDown={handleKeyDown} />

        <NodeEditorContext value={{ setEditorRef: setEditorRef }}>
          {children}
        </NodeEditorContext>
      </div>
    </div>
  );
};

export default DocumentLayout;
