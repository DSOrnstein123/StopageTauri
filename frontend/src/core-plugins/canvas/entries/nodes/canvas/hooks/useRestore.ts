import { nodeKeys } from "@system/entry/categories/node/core/keys";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../definition";

export const useRestore = (id: string) => {
  const api = useApi();

  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => api.restore(),
  });
};
