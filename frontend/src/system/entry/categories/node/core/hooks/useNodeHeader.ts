import { useQuery } from "@tanstack/react-query";
import { nodeKeys } from "../../../../../entry/categories/node/core/keys";
import { nodeService } from "../service";

const useNodeHeader = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id),
    select: (data) => ({
      icon: data.icon,
      name: data.name,
    }),
    staleTime: Infinity,
  });
};

export default useNodeHeader;
