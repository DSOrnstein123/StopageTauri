import { useGetNodeDetailQuery } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";

const useGetTemplateQuery = (id: string) => {
  return useGetNodeDetailQuery<"document-template">(id);
};

export default useGetTemplateQuery;
