import type { TYPE } from "@core-plugins/document/entries/nodes/document-template/identity";
import { applyTemplateMutationOptions } from "@system/entry/categories/node/kinds/template/hooks/applyTemplateMutationOptions";
import { useMutation } from "@tanstack/react-query";

const useApplyTemplateMutation = () => {
  return useMutation({
    ...applyTemplateMutationOptions<TYPE>(),
  });
};

export default useApplyTemplateMutation;
