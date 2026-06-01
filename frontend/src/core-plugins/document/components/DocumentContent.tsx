import { Editor, EditorContent, useEditorState } from "@tiptap/react";
import { CustomBubbleMenu as BubbleMenu } from "@system/lib/editor/bubble-menu/CustomBubbleMenu";
import TemplatePicker from "./TemplatePicker";

const DocumentContent = ({ editor }: { editor: Editor }) => {
  const isEmpty = useEditorState({
    editor: editor,
    selector: ({ editor }) => editor.isEmpty,
  });

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />

      {isEmpty && <TemplatePicker />}
    </>
  );
};

export default DocumentContent;
