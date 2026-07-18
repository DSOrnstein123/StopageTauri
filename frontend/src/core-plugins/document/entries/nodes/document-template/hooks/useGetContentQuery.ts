import { getNodeDetailQueryOptions } from "@system/features/node/shared/hooks/useGetNodeDetailQuery";
import { useQuery } from "@tanstack/react-query";

const useGetContentQuery = (id: string) => {
  return useQuery({
    ...getNodeDetailQueryOptions<"document-template">(id),
    select: (data) => data.data.defaultData,
  });
};

export default useGetContentQuery;
