import { pluginManager } from "@system/plugin-manager/pluginManager";
import type { NodeDetail } from "../schema";

const NodeContent = ({ data }: { data: NodeDetail }) => {
  /* eslint-disable react-hooks/static-components */
  const Content = pluginManager.getNodeView(data.type);
  if (!Content) return null;

  return <Content />;
};

export default NodeContent;
