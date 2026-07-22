import { queryOptions } from "@tanstack/react-query";
import { getNodeDetailQueryOptions } from "../../../core/hooks/useGetNodeDetailQuery";

export const getTemplateDetailQueryOptions = (id: string) =>
  queryOptions({
    ...getNodeDetailQueryOptions(id),
  });

// export const useGetTemplateDetailQuery = () => {
//   return useGetNodeDetailQuery();
// };
