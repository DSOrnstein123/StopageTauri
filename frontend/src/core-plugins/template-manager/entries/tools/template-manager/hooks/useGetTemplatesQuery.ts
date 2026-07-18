import type { TemplateMetadataList } from "@system/features/node/template/schemas";
import { TEMPLATE_CONFIG } from "../../../../constants";
import { useGetNodes } from "@system/features/node/shared/hooks/useGetNodes";

const useGetTemplatesQuery = () => {
  return useGetNodes<TemplateMetadataList>(TEMPLATE_CONFIG);
};

export default useGetTemplatesQuery;
