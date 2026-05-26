import useNodeName from "@system/domain/node/hooks/useNodeName";

const DynamicTitle = ({ id }: { id: string }) => {
  const { data: title } = useNodeName(id);

  return <>{title}</>;
};

export default DynamicTitle;
