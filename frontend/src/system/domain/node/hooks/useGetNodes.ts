import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys/nodeKeys";
import { nodeService } from "../services/nodeService";

export const useGetNodes = () => {
  return useQuery({
    queryKey: nodeKeys.list(),
    queryFn: async () => {
      const nodeList = await nodeService.getList();
      return nodeList;
    },
    staleTime: Infinity,
  });
};
