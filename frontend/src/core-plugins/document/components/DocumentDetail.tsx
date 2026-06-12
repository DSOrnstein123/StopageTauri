import useDocumentData from "../hooks/useDocumentData";
import useDocumentEditor from "../../../system/features/text-editor/hooks/useDocumentEditor";
import useWorkspaceSync from "../hooks/useWorkspaceSync";
import DocumentContent from "./DocumentContent";
import { useNodeContext } from "@system/features/node/context/NodeContext";
import { useTabContext } from "@system/features/workspace/context/TabContext";
import { useNodeEditorContext } from "@system/features/node/context/NodeEditorContext";

const DocumentDetail = () => {
  const { id } = useNodeContext();
  const { isActive } = useTabContext();
  const { setEditorRef } = useNodeEditorContext();
  const { editor, localTOC } = useDocumentEditor(id, setEditorRef);
  useDocumentData(id, editor);
  useWorkspaceSync(isActive, editor, localTOC);

  if (!editor) return;

  return <DocumentContent editor={editor} />;
};

export default DocumentDetail;
