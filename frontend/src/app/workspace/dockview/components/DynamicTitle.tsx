import useNodeName from "@system/entry/categories/node/core/hooks/useNodeName";

const DynamicTitle = ({ id }: { id: string }) => {
  const { data: title } = useNodeName(id);

  return <>{title}</>;
};

export default DynamicTitle;
