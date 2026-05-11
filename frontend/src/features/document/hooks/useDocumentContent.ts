import { nodeKeys } from "@system/domain/node/keys/nodeKeys";
import { nodeService } from "@system/domain/node/services/nodeService";
import { useQuery } from "@tanstack/react-query";

const useDocumentContent = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeService.getDetail(id),
    select: (data) => data.content,
    staleTime: Infinity,
  });
};

export default useDocumentContent;
