import { pluginRegistry } from "@system/registries/pluginRegistry";
import type { NodeDetail } from "../schemas/nodeSchema";

const NodeContent = ({ data }: { data: NodeDetail }) => {
  /* eslint-disable react-hooks/static-components */
  const Content = pluginRegistry.getNodeComponent(data.type);
  if (!Content) return null;

  return (
    <div className="pt-0">
      <Content />
    </div>
  );
};

export default NodeContent;
