import { useNodeContext } from "@system/features/node/context/NodeContext";
import useGetTemplateQuery from "../hooks/useGetTemplateQuery";
import RichTextEditor from "@system/features/text-editor/components/RichTextEditor";

const TemplateView = () => {
  const { id } = useNodeContext();
  const { data } = useGetTemplateQuery(id);

  return <RichTextEditor></RichTextEditor>;
};

export default TemplateView;
