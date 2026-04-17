import Collection from "@/features/collection/components/Collection";
import { NodeViewWrapper } from "@tiptap/react";
import { GripVertical } from "lucide-react";

const CollectionView = () => {
  return (
    <NodeViewWrapper className="group relative w-full rounded-sm bg-white transition-all">
      <div
        contentEditable={false}
        data-drag-handle
        className="absolute top-2 -left-6 cursor-grab rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-yellow-200"
      >
        <GripVertical size={16} className="text-gray-400" />
      </div>

      <Collection />
    </NodeViewWrapper>
  );
};

export default CollectionView;
