import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys/nodeKeys";
import { nodeService } from "../services/nodeService";
import type { NodeFilterOptions } from "../types/node";

export const useGetNodes = (options: NodeFilterOptions = {}) => {
  return useQuery({
    queryKey: nodeKeys.list(options),
    queryFn: () => nodeService.getList(options),
    staleTime: Infinity,
  });
};
