import { systemApi } from "@system/api";
import type { CreateNodePayload } from "@system/features/node/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TEMPLATE_CONFIG } from "../../../../constants";

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
