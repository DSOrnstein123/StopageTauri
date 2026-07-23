import { applyTemplateMutationOptions } from "@system/entry/categories/node/kinds/template/hooks/applyTemplateMutationOptions";
import { useMutation } from "@tanstack/react-query";

const useApplyTemplateMutation = () => {
  return useMutation({
    ...applyTemplateMutationOptions<"document-template">(),
  });
};

export default useApplyTemplateMutation;
