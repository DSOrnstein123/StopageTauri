import type { ReactNode } from "react";
import useHydrateRichTextEditor from "../hooks/useHydrateRichTextEditor";
import useRichTextEditor from "../hooks/useRichTextEditor";
import useRichTextEditorChange from "../hooks/useRichTextEditorContent";
import RichTextEditor from "./RichTextEditor";
import { type JSONContent } from "@system/lib/tiptap";

const RichTextEditorView = ({
  content,
  onContentChange,
  children,
}: {
  content: JSONContent;
  onContentChange: (content: JSONContent) => void;
  children?: ReactNode;
}) => {
  const editor = useRichTextEditor();

  useHydrateRichTextEditor(editor, content);
  useRichTextEditorChange(editor, onContentChange);

  if (!editor) return null;

  return <RichTextEditor editor={editor}>{children}</RichTextEditor>;
};

export default RichTextEditorView;
