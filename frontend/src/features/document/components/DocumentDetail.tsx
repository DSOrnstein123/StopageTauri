import { Editor } from "@tiptap/react";
import { type RefObject } from "react";
import { usePanelContext } from "@/layout/dockview/panel-context/usePanelParams";
import useDocumentData from "../hooks/useDocumentData";
import useDocumentEditor from "../hooks/useDocumentEditor";
import useWorkspaceSync from "../hooks/useWorkspaceSync";
import DocumentProperties from "./DocumentProperties";
import DocumentContent from "./DocumentContent";

const DocumentDetail = ({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) => {
  const panelContext = usePanelContext();
  const documentId = panelContext.params.documentId as string;

  const { editor, localTOC } = useDocumentEditor(editorRef);
  const { mappedProperties: properties } = useDocumentData(documentId, editor);
  useWorkspaceSync(editor, documentId, localTOC);

  if (!editor) return;

  return (
    <>
      <DocumentProperties data={properties} />
      <DocumentContent editor={editor} />
    </>
  );
};

export default DocumentDetail;
