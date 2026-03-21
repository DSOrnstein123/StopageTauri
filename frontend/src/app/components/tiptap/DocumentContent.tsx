import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SlashCommandExtension from "./extensions/slash-command/slashCommands";
import ContentBlock from "./extensions/block-node/contentBlock";
import { CustomBubbleMenu as BubbleMenu } from "./CustomBubbleMenu";
import { Placeholder } from "@tiptap/extensions";
import {
  FloatDragExtension,
  syncAlignAttrs,
} from "./extensions/dnd/floatDragExtension";
import { ColumnContainer } from "./extensions/column/columnContainer";
import { Column } from "./extensions/column/column";
import debounce from "@/shared/utils/debounce";
import { invoke } from "@tauri-apps/api/core";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect, type RefObject } from "react";

const extensions = [
  StarterKit.configure({
    dropcursor: false,
  }),
  SlashCommandExtension,
  ContentBlock,
  Placeholder.configure({
    showOnlyCurrent: true,
    placeholder: () => {
      return "Press '/' for commands";
    },
  }),
  FloatDragExtension,
  Column,
  ColumnContainer,
  // KanbanNode,
];

const route = getRouteApi("/(features)/documents/$documentId");

const DocumentContent = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const { documentId } = route.useParams();
  const document = route.useLoaderData();

  const editor = useEditor({
    extensions: extensions,
    content: document.content ? JSON.parse(document.content) : "",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose-mirror-container",
      },
    },
    onCreate({ editor }) {
      requestAnimationFrame(() => syncAlignAttrs(editor.view));
    },
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = debounce<(props: { editor: Editor }) => void>(
      (props) => {
        const content = props.editor.getJSON();
        invoke("update_document", {
          id: documentId,
          content: JSON.stringify(content),
        });
      },
      500,
    );
    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, documentId]);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor, editorRef]);

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default DocumentContent;
