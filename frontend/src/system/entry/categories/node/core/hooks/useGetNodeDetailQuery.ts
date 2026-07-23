import { queryOptions, useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../../../../../entry/categories/node/core/keys";
import { nodeService } from "../service";
import type { NodeType } from "@system/plugin-manager/plugin";
import type { NodeDetailMap } from "@system/entry/categories/node/core/types";

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
