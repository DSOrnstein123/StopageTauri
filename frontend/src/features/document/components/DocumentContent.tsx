import { Editor, EditorContent } from "@tiptap/react";
import { CustomBubbleMenu as BubbleMenu } from "../tiptap/bubble-menu/CustomBubbleMenu";

const DocumentContent = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};

export default DocumentContent;
