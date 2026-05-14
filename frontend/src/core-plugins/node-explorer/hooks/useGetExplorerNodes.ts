import { useGetNodes } from "@system/domain/node/hooks/useGetNodes";

const useGetExplorerNodes = () => {
  return useGetNodes({
    includeKinds: ["folder", "file"],
  });
};

export default useGetExplorerNodes;
