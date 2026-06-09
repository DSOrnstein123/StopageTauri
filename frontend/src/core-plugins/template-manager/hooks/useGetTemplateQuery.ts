import { systemApi } from "@system/apis";
import { nodeKeys } from "@system/features/node/keys";
import { useQuery } from "@tanstack/react-query";
import { TEMPLATE_CONFIG } from "../constants";

const useGetTemplateQuery = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.list(TEMPLATE_CONFIG),
    queryFn: () => systemApi.node.get(id),
    staleTime: Infinity,
  });
};

export default useGetTemplateQuery;
