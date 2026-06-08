import { EditorContent, Editor } from "@system/lib/tiptap";
import { BubbleMenu } from "./BubbleMenu";

const RichTextEditor = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};

export default RichTextEditor;
