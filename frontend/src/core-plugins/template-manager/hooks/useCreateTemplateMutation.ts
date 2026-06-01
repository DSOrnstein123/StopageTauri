import { systemApi } from "@system/apis";
import type { CreateNodePayload } from "@system/features/node/types";
import { useMutation } from "@tanstack/react-query";

const useCreateTemplateMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateNodePayload) => systemApi.node.create(payload),
  });
};

export default useCreateTemplateMutation;
