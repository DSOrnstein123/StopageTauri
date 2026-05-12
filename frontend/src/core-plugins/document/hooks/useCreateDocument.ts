import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../services/documentService";
import { nodeKeys } from "@system/domain/node/keys/nodeKeys";
import type { NodeMetadataList } from "@system/domain/node/schemas/nodeSchema";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => documentService.create(),

    onSuccess: (newDoc) => {
      queryClient.setQueryData<NodeMetadataList>(
        nodeKeys.list("file"),
        (oldData = []) => [...oldData, newDoc],
      );
    },
  });
};

export default useCreateDocument;
