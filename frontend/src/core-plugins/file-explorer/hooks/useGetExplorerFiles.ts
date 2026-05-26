import { useGetNodes } from "@system/features/node/hooks/useGetNodes";
import { EXPLORER_CONFIG } from "../constants";

const useGetExplorerFiles = () => {
  return useGetNodes(EXPLORER_CONFIG);
};

export default useGetExplorerFiles;
