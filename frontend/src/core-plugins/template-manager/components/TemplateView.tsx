import { useNodeContext } from "@system/features/node/context/NodeContext";
import useGetTemplateQuery from "../hooks/useGetTemplateQuery";

const TemplateView = () => {
  const { id } = useNodeContext();
  const { data } = useGetTemplateQuery(id);

  return <div>{data?.name}</div>;
};

export default TemplateView;
