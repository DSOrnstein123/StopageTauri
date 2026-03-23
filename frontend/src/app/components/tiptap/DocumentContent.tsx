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
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useEffect, type RefObject } from "react";
import CustomLink from "./extensions/custom-link/customLink";
import { useTabStore } from "@/app/store/tabStore";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

const route = getRouteApi("/(features)/documents/$documentId");

const lowlight = createLowlight(all);

const DocumentContent = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const { documentId } = route.useParams();
  const { documentContent } = route.useLoaderData();
  const navigate = useNavigate();
  const activeTabId = useTabStore((state) => state.activeTabId);
  const updateTabRoute = useTabStore((state) => state.updateTabRoute);

  const extensions = [
    StarterKit.configure({
      dropcursor: false,
      link: false,
    }),
    CustomLink.configure({
      openOnClick: false,
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
    CodeBlockLowlight.configure({
      lowlight,
    }),
    // KanbanNode,
  ];

  const editor = useEditor({
    extensions: extensions,
    content: documentContent.content ? JSON.parse(documentContent.content) : "",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose-mirror-container",
      },
      handleClick(_1, _2, event) {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (!anchor) return false;

        const href = anchor.getAttribute("href");

        if (href?.startsWith("/documents/")) {
          const documentId = href.split("/documents/")[1];
          updateTabRoute(activeTabId!, `/documents/${documentId}`);
          navigate({
            to: "/documents/$documentId",
            params: { documentId },
          });
          return true;
        }

        if (href) {
          window.open(href, "_blank");
          return true;
        }

        return false;
      },
    },
    onCreate({ editor }) {
      requestAnimationFrame(() => {
        if (editor.isDestroyed) return;
        syncAlignAttrs(editor.view);
      });
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
    if (editor) {
      editorRef.current = editor;
    }
    return () => {
      editorRef.current = null;
    };
  }, [editor, editorRef]);

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(
      documentContent.content ? JSON.parse(documentContent.content) : "",
    );
  }, [editor, documentContent]);

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default DocumentContent;
