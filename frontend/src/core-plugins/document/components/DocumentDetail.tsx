import DocumentContent from "./DocumentContent";
import { useNodeContext } from "@system/features/node/context/NodeContext";
import useDocumentEditor from "../hooks/useDocumentEditor";

const DocumentDetail = () => {
  const { id } = useNodeContext();
  // const { setEditorRef } = useNodeEditorContext();
  const editor = useDocumentEditor(id);

  if (!editor) return;

  return <DocumentContent editor={editor} />;
};

export default DocumentDetail;
