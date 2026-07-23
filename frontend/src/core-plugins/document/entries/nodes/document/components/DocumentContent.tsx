import EmptyPlaceholderSlot from "./EmptyPlaceholderSlot";
import RichTextEditorView from "@system/text-editor/components/RichTextEditorView";
import { type JSONContent } from "@system/lib/tiptap";
import useGetCurrentContentQuery from "../hooks/useGetCurrentContentQuery";
import useUpdateCurrentContent from "../hooks/useUpdateCurrentContent";

const DocumentContent = () => {
  const { data: content } = useGetCurrentContentQuery() as JSONContent;
  const saveContent = useUpdateCurrentContent();

  return (
    <RichTextEditorView content={content} onContentChange={saveContent}>
      <EmptyPlaceholderSlot />
    </RichTextEditorView>
  );
};

export default DocumentContent;
