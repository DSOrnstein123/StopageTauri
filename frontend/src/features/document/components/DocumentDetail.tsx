import { Editor } from "@tiptap/react";
import { type RefObject } from "react";
import useDocumentData from "../hooks/useDocumentData";
import useDocumentEditor from "../hooks/useDocumentEditor";
import useWorkspaceSync from "../hooks/useWorkspaceSync";
import DocumentContent from "./DocumentContent";
import { useTabContext } from "@shared/tab-context/TabContext";
import { useFileContext } from "@entities/file/context/FileContext";

const DocumentDetail = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const { id } = useFileContext();
  const { isActive } = useTabContext();
  const { editor, localTOC } = useDocumentEditor(id, editorRef);
  useDocumentData(id, editor);
  useWorkspaceSync(isActive, editor, localTOC);

  if (!editor) return;

  return <DocumentContent editor={editor} />;
};

export default DocumentDetail;
