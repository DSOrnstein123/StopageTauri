import { useEffect } from "react";
import { Editor, type JSONContent } from "@system/lib/tiptap";
import debounce from "@system/shared/utils/debounce";

const useRichTextEditorChange = (
  editor: Editor | null,
  onContentChange: (content: JSONContent) => void,
) => {
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = debounce<(props: { editor: Editor }) => void>(
      (props) => {
        const content = props.editor.getJSON();
        onContentChange(content);
      },
      500,
    );
    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onContentChange]);
};

export default useRichTextEditorChange;
