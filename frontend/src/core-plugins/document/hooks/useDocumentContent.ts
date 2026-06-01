import { nodeKeys } from "@system/features/node/keys";
import { nodeService } from "@system/features/node/services";
import { useQuery } from "@tanstack/react-query";

const useDocumentContent = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id),
    select: (res) => res.data,
    staleTime: Infinity,
  });
};

export default useDocumentContent;
