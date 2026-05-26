import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys";
import { nodeService } from "../services";

export const useGetNodeDetail = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id),
    staleTime: Infinity,
  });
};
