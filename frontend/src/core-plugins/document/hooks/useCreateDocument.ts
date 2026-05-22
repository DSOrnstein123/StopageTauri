import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nodeKeys } from "@system/domain/node/keys";
import type { NodeMetadataList } from "@system/domain/node/schemas/nodeSchema";
import EXPLORER_CONFIG from "@core-plugins/file-explorer";
import { nodeService } from "@system/domain/node/services";
import { DEFAULT_DOCUMENT_VALUES } from "../constants";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => nodeService.create(DEFAULT_DOCUMENT_VALUES),

    onSuccess: (newDoc) => {
      queryClient.setQueryData<NodeMetadataList>(
        nodeKeys.list(EXPLORER_CONFIG),
        (oldData = []) => [...oldData, newDoc],
      );
    },
  });
};

export default useCreateDocument;
