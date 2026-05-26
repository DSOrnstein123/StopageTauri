import Node from "@system/domain/node/components/Node";

const DynamicTabContent = ({ id }: { id: string }) => {
  return <Node className="flex-1" id={id} />;
};

export default DynamicTabContent;
