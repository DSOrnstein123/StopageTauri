import { Editor } from "@tiptap/react";
import { type RefObject } from "react";
import useDocumentData from "../hooks/useDocumentData";
import useDocumentEditor from "../hooks/useDocumentEditor";
import useWorkspaceSync from "../hooks/useWorkspaceSync";
import DocumentContent from "./DocumentContent";

const DocumentDetail = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const { editor, localTOC } = useDocumentEditor(editorRef);
  useDocumentData(editor);
  useWorkspaceSync(editor, localTOC);

  if (!editor) return;

  return <DocumentContent editor={editor} />;
};

export default DocumentDetail;
