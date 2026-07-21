import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys";
import { nodeService } from "../services";
import type { NodeListOptions } from "../types";
import type { NodeMetadataList } from "../schemas";

export const useGetNodes = <N extends NodeMetadataList>(
  options: NodeListOptions = {},
) => {
  return useQuery<N>({
    queryKey: nodeKeys.list(options),
    queryFn: () => nodeService.getList(options) as unknown as N,
    staleTime: Infinity,
  });
};
