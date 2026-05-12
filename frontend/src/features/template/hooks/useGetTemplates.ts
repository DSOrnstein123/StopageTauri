import { nodeKeys } from "@system/domain/node/keys/nodeKeys";
import { nodeService } from "@system/domain/node/services/nodeService";
import { useQuery } from "@tanstack/react-query";

const useGetTemplates = () => {
  return useQuery({
    queryKey: nodeKeys.list("template"),
    queryFn: () => nodeService.getList({ includeTypes: "template" }),
    staleTime: Infinity,
  });
};

export default useGetTemplates;
