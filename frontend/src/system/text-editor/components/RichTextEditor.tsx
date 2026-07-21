import { EditorContent, Editor, useEditorState } from "@system/lib/tiptap";
import { BubbleMenu } from "./BubbleMenu";
import type { ReactNode } from "react";

const RichTextEditor = ({
  editor,
  children,
}: {
  editor: Editor;
  children?: ReactNode;
}) => {
  const isEmpty = useEditorState({
    editor: editor,
    selector: ({ editor }) => editor.isEmpty,
  });

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />

      {isEmpty && children}
    </>
  );
};

export default RichTextEditor;
