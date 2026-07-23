import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import { useQuery } from "@tanstack/react-query";

const useGetContentQuery = (id: string) => {
  return useQuery({
    ...getNodeDetailQueryOptions<"document-template">(id),
    select: (data) => data.data.defaultData,
  });
};

export default useGetContentQuery;
