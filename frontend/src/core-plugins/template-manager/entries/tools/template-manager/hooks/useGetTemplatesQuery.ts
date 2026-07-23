import type { TemplateMetadataList } from "@system/entry/categories/node/kinds/template/schema";
import { TEMPLATE_CONFIG } from "../../../../constants";
import { useGetNodes } from "@system/entry/categories/node/core/hooks/useGetNodes";

const useGetTemplatesQuery = () => {
  return useGetNodes<TemplateMetadataList>(TEMPLATE_CONFIG);
};

export default useGetTemplatesQuery;
