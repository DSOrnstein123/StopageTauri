import { useGetNodes } from "@system/domain/node/hooks/useGetNodes";

const useGetExplorerFiles = () => {
  return useGetNodes({
    includeKinds: ["folder", "file"],
  });
};

export default useGetExplorerFiles;
