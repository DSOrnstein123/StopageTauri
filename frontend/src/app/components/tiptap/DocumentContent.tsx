import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SlashCommandExtension from "./extensions/slash-command/slashCommands";
import ContentBlock from "./extensions/block-node/contentBlock";
import { CustomBubbleMenu as BubbleMenu } from "./CustomBubbleMenu";
import { Placeholder } from "@tiptap/extensions";
import { FloatDragExtension } from "./extensions/dnd/floatDragExtension";

const extensions = [
  StarterKit,
  SlashCommandExtension,
  ContentBlock,
  Placeholder.configure({
    showOnlyCurrent: true,
    placeholder: () => {
      return "Press '/' for commands";
    },
  }),
  FloatDragExtension,
  // KanbanNode,
];

const content = ``;

const DocumentContent = () => {
  // const { id } = useParams();

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none prose-mirror-container",
      },
    },
  });

  // const saveContent = debounce<(editor: Editor) => void>((currentEditor) => {
  //   const docJSON = currentEditor.getJSON();

  // }, 1000);

  // useEffect(() => {
  //   if (!editor) return;

  //   const handleUpdate = (editor: Editor) => {
  //     saveContent(editor);
  //   };

  //   editor.on("update", ({ editor }) => handleUpdate(editor));

  //   return () => {
  //     editor.off("update", ({ editor }) => handleUpdate(editor));
  //   };
  // }, [editor, saveContent]);

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default DocumentContent;
