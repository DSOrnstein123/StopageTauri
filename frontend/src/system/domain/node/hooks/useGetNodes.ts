import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys/nodeKeys";
import { nodeService } from "../services/nodeService";
import type { NodeFilterOptions } from "../types/node";
import type { NodeMetadataList } from "../schemas/nodeSchema";

export const useGetNodes = <T extends NodeMetadataList>(
  options: NodeFilterOptions = {},
) => {
  return useQuery<T>({
    queryKey: nodeKeys.list(options),
    queryFn: () => nodeService.getList(options) as unknown as T,
    staleTime: Infinity,
  });
};
