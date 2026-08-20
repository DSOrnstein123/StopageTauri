import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import { useQuery } from "@tanstack/react-query";

export const useResourceImportsByNode = (canvasId: string) => {
  return useQuery({
    ...getNodeDetailQueryOptions<"canvas">(canvasId),
    select: (data) => data.data.resourceImportsByNode,
  });
};
