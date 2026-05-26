import type { TemplateMetadataList } from "@system/features/node/schemas/templateSchema";
import { TEMPLATE_CONFIG } from "../constants";
import { useGetNodes } from "@system/features/node/hooks/useGetNodes";

const useGetTemplates = () => {
  return useGetNodes<TemplateMetadataList>(TEMPLATE_CONFIG);
};

export default useGetTemplates;
