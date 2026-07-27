import EmptyPlaceholderSlot from "./EmptyPlaceholderSlot";
import { type JSONContent } from "@system/lib/tiptap";
import useGetCurrentContentQuery from "../hooks/useGetCurrentContentQuery";
import useUpdateCurrentContent from "../hooks/useUpdateCurrentContent";
import type { ViewProps } from "../types";

const Content = ({ EditorView }: ViewProps) => {
  const { data: content } = useGetCurrentContentQuery() as JSONContent;
  const saveContent = useUpdateCurrentContent();

  return (
    <EditorView
      content={content}
      onContentChange={saveContent}
      emptyPlaceholder={<EmptyPlaceholderSlot />}
    />
  );
};

export default Content;
