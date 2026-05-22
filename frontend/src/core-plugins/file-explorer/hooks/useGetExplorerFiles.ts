import { useGetNodes } from "@system/domain/node/hooks/useGetNodes";
import { EXPLORER_CONFIG } from "../constants";

const useGetExplorerFiles = () => {
  return useGetNodes(EXPLORER_CONFIG);
};

export default useGetExplorerFiles;
