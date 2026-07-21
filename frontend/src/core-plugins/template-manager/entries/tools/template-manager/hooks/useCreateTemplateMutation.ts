import { systemApi } from "@system/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TEMPLATE_CONFIG } from "../../../../constants";
import type { CreateNodePayload } from "@system/features/node/shared/types";

const useCreateTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNodePayload) => systemApi.node.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: systemApi.node.keys.list(TEMPLATE_CONFIG),
      });
    },
  });
};

export default useCreateTemplateMutation;
