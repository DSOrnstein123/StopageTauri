import type { TemplateMetadataList } from "@system/features/node/schemas/templateSchema";
import { TEMPLATE_CONFIG } from "../constants";
import { useGetNodes } from "@system/features/node/hooks/useGetNodes";

const useGetTemplatesQuery = () => {
  return useGetNodes<TemplateMetadataList>(TEMPLATE_CONFIG);
};

export default useGetTemplatesQuery;
