import Node from "@system/features/node/components/Node";

const NodeTab = ({ nodeId }: { nodeId: string }) => {
  console.log(nodeId);
  return <Node id={nodeId} />;
};

export default NodeTab;
