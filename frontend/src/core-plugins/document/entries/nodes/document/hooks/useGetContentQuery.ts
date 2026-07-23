import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import { useQuery } from "@tanstack/react-query";
import type { TYPE } from "../definition";

const useGetContentQuery = (id: string) => {
  return useQuery({
    ...getNodeDetailQueryOptions<TYPE>(id),
    select: (data) => data.data,
  });
};

export default useGetContentQuery;
