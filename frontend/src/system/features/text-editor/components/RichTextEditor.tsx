import { tiptapAdapter, type TextEditor } from "@system/lib/tiptap/adapter";

const RichTextEditor = ({ editor }: { editor: TextEditor }) => {
  const { EditorContent, BubbleMenu } = tiptapAdapter;

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};

export default RichTextEditor;
