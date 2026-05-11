import { Editor } from "@tiptap/react";
import { type RefObject } from "react";
import useDocumentData from "../hooks/useDocumentData";
import useDocumentEditor from "../hooks/useDocumentEditor";
import useWorkspaceSync from "../hooks/useWorkspaceSync";
import DocumentContent from "./DocumentContent";
import { useNodeContext } from "@system/domain/node/context/NodeContext";
import { useTabContext } from "@system/tab-context/TabContext";

const DocumentDetail = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const { id } = useNodeContext();
  const { isActive } = useTabContext();
  const { editor, localTOC } = useDocumentEditor(id, editorRef);
  useDocumentData(id, editor);
  useWorkspaceSync(isActive, editor, localTOC);

  if (!editor) return;

  return <DocumentContent editor={editor} />;
};

export default DocumentDetail;
