import { tiptapAdapter, type TextEditor } from "@system/lib/tiptap/adapter";
import TemplatePicker from "./TemplatePicker";
import RichTextEditor from "@system/features/text-editor/components/RichTextEditor";

const DocumentContent = ({ editor }: { editor: TextEditor }) => {
  const isEmpty = tiptapAdapter.useEditorState({
    editor: editor,
    selector: ({ editor }) => editor.isEmpty,
  });

  return (
    <>
      <RichTextEditor editor={editor} />

      {isEmpty && <TemplatePicker />}
    </>
  );
};

export default DocumentContent;
