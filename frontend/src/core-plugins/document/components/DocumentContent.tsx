import { Editor } from "@system/lib/tiptap";
import RichTextEditor from "@system/features/text-editor/components/RichTextEditor";
import EmptyPlaceholderSlot from "./EmptyPlaceholderSlot";

const DocumentContent = ({ editor }: { editor: Editor }) => {
  return (
    <RichTextEditor editor={editor}>
      <EmptyPlaceholderSlot />
    </RichTextEditor>
  );
};

export default DocumentContent;
