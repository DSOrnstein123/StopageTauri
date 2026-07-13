import { getNodeDetailQueryOptions } from "@system/features/node/hooks/useGetNodeDetailQuery";
import { useQuery } from "@tanstack/react-query";
import { TYPE } from "../constants";

const useGetContentQuery = (id: string) => {
  return useQuery({
    ...getNodeDetailQueryOptions<TYPE>(id),
    select: (data) => data.data,
  });
};

export default useGetContentQuery;
