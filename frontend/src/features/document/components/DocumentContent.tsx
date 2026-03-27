import { Editor, EditorContent } from "@tiptap/react";
import { CustomBubbleMenu as BubbleMenu } from "../tiptap/bubble-menu/CustomBubbleMenu";
import { type RefObject } from "react";
import { usePanelContext } from "@/layout/dockview/panel-context/usePanelParams";
import useDocumentData from "../hooks/useDocumentData";
import useDocumentEditor from "../hooks/useDocumentEditor";
import useWorkspaceSync from "../hooks/useWorkspaceSync";

const DocumentContent = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const panelContext = usePanelContext();
  const documentId = panelContext.params.documentId;

  const { editor, localTOC } = useDocumentEditor(editorRef);
  useDocumentData(documentId, editor);
  useWorkspaceSync(editor, documentId, localTOC);

  if (!editor) return;

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};

export default DocumentContent;
