import useNodeName from "@system/features/node/hooks/useNodeName";

const DynamicTitle = ({ id }: { id: string }) => {
  const { data: title } = useNodeName(id);

  return <>{title}</>;
};

export default DynamicTitle;
