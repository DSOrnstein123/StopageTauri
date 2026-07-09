import RichTextEditorView from "@system/features/text-editor/components/RichTextEditorView";
import useGetCurrentContentQuery from "../hooks/useGetCurrentContentQuery";
import DocumentTemplatePicker from "../../../../entries/tools/template-manager/components/DocumentTemplatePicker";
import useUpdateCurrentContent from "../hooks/useUpdateCurrentContent";
import { DocumentLayout } from "@core-plugins/document";

const DocumentTemplateView = () => {
  const content = useGetCurrentContentQuery();
  const saveContent = useUpdateCurrentContent();

  return (
    <DocumentLayout>
      <RichTextEditorView content={content} onContentChange={saveContent}>
        <DocumentTemplatePicker />
      </RichTextEditorView>
    </DocumentLayout>
  );
};

export default DocumentTemplateView;
