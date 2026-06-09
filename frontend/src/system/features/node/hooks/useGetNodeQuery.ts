import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys";
import { nodeService } from "../services";
import type { NodeDetail } from "../schemas/nodeSchema";

export const useGetNodeQuery = <N extends NodeDetail>(id: string) => {
  return useQuery<N>({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id) as unknown as N,
    staleTime: Infinity,
  });
};
