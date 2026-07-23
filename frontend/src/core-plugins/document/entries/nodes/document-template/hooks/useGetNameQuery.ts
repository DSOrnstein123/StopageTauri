import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import { useQuery } from "@tanstack/react-query";

const useGetNameQuery = (id: string) => {
  return useQuery({
    ...getNodeDetailQueryOptions<"document-template">(id),
    select: (data) => data.data.defaultName,
  });
};

export default useGetNameQuery;
