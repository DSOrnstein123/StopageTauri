import { useGetNodeDetailQuery } from "@system/features/node/shared/hooks/useGetNodeDetailQuery";

const useGetTemplateQuery = (id: string) => {
  return useGetNodeDetailQuery<"document-template">(id);
};

export default useGetTemplateQuery;
