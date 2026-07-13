import Node from "@system/features/node/shared/components/Node";

const NodeTab = ({ nodeId }: { nodeId: string }) => {
  console.log(nodeId);
  return <Node id={nodeId} />;
};

export default NodeTab;
