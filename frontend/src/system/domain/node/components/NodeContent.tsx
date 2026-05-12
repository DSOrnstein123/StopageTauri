import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys/nodeKeys";
import { nodeService } from "../services/nodeService";
import { useNodeContext } from "../context/NodeContext";
import { pluginRegistry } from "@system/registries/pluginRegistry";

const NodeContent = () => {
  const { id } = useNodeContext();
  const { data } = useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id),
    staleTime: Infinity,
  });
  if (!data) return null;

  /* eslint-disable react-hooks/static-components */
  const Content = pluginRegistry.getComponent(data.type);
  if (!Content) return null;

  return <Content data={data} />;
};

export default NodeContent;
