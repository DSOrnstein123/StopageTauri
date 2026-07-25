import "./style.css";

import RichTextEditor from "./components/RichTextEditor";
import useRichTextEditor from "../../provider/block-editor-provider/hooks/useRichTextEditor";
import useHydrateRichTextEditor from "../../provider/block-editor-provider/hooks/useHydrateRichTextEditor";
import useRichTextEditorChange from "../../provider/block-editor-provider/hooks/useRichTextEditorContent";
import type { ViewProps } from "./types";

const View = ({ content, onContentChange, emptyPlaceholder }: ViewProps) => {
  const editor = useRichTextEditor();

  useHydrateRichTextEditor(editor, content);
  useRichTextEditorChange(editor, onContentChange);

  if (!editor) return null;

  return <RichTextEditor editor={editor}>{emptyPlaceholder}</RichTextEditor>;
};

export default View;
