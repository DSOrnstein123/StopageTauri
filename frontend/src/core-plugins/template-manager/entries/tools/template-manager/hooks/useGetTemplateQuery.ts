import { useGetNodeQuery } from "@system/features/node/hooks/useGetNodeDetailQuery";
import type { TemplateDetail } from "@system/features/node/schemas/templateSchema";

const useGetTemplateQuery = (id: string) => {
  return useGetNodeQuery<TemplateDetail>(id);
};

export default useGetTemplateQuery;
