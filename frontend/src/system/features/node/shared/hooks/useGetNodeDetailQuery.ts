import { queryOptions, useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys";
import { nodeService } from "../services";
import type { NodeType } from "@system/registries/plugin";
import type { NodeDetailMap } from "@system/registries/node";

export const getNodeDetailQueryOptions = <N extends NodeType>(id: string) =>
  queryOptions({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id) as Promise<NodeDetailMap<N>>,
    enabled: !!id,
    staleTime: Infinity,
  });

export const useGetNodeDetailQuery = <N extends NodeType>(id: string) => {
  return useQuery(getNodeDetailQueryOptions<N>(id));
};
