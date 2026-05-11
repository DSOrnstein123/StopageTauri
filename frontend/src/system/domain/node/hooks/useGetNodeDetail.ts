import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../keys/nodeKeys";
import { nodeService } from "../services/nodeService";

export const useGetNodeDetail = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id),
    staleTime: Infinity,
  });
};
