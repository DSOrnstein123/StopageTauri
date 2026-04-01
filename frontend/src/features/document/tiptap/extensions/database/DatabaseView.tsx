import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { GripVertical } from "lucide-react";

const DatabaseView = () => {
  return (
    <NodeViewWrapper className="group relative w-full rounded-sm border bg-yellow-100 p-4 transition-all">
      <div
        contentEditable={false}
        data-drag-handle
        className="absolute top-2 -left-6 cursor-grab rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-yellow-200"
      >
        <GripVertical size={16} className="text-gray-400" />
      </div>

      <NodeViewContent className="min-h-6 outline-none" />
    </NodeViewWrapper>
  );
};

export default DatabaseView;
