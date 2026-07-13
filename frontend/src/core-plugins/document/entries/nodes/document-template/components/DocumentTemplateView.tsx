import RichTextEditorView from "@system/features/text-editor/components/RichTextEditorView";
import useGetCurrentContentQuery from "../hooks/useGetCurrentContentQuery";
import useUpdateCurrentContent from "../hooks/useUpdateCurrentContent";
import { DocumentShell } from "@core-plugins/document";
import { type JSONContent } from "@system/lib/tiptap";
import Header from "./Header";
import DocumentTemplatePicker from "../../../../widget/document-template-picker/components/Widget";

//TODO: fix on press Enter
//TODO: rewrite name input and move to system
const DocumentTemplateView = () => {
  const { data: content } = useGetCurrentContentQuery() as JSONContent;
  const saveContent = useUpdateCurrentContent();

  return (
    <DocumentShell header={<Header />}>
      <RichTextEditorView content={content} onContentChange={saveContent}>
        <DocumentTemplatePicker />
      </RichTextEditorView>
    </DocumentShell>
  );
};

export default DocumentTemplateView;
