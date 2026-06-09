import { Editor, useEditorState } from "@system/lib/tiptap";
import TemplatePicker from "./TemplatePicker";
import RichTextEditor from "@system/features/text-editor/components/RichTextEditor";

const DocumentContent = ({ editor }: { editor: Editor }) => {
  const isEmpty = useEditorState({
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
