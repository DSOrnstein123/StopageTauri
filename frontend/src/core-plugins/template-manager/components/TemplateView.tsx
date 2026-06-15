import { useNodeContext } from "@system/features/node/context/NodeContext";
import useGetTemplateQuery from "../hooks/useGetTemplateQuery";
import RichTextEditor from "@system/features/text-editor/components/RichTextEditor";
import { useRichTextEditor } from "@system/features/text-editor";
import DocumentTemplatePicker from "./DocumentTemplatePicker";

const TemplateView = () => {
  const { id } = useNodeContext();
  const { data } = useGetTemplateQuery(id);
  const editor = useRichTextEditor({
    content: data?.data.defaultContent ?? {},
  });

  return (
    <RichTextEditor editor={editor}>
      <DocumentTemplatePicker />
    </RichTextEditor>
  );
};

export default TemplateView;
