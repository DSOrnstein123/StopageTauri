import { useGetNodes } from "@system/entry/categories/node/core/hooks/useGetNodes";

export const DocumentList = () => {
  const list = useGetNodes({
    includeKinds: ["file"],
    includeTypes: ["document"],
  });

  return <div></div>;
};
