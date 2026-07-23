import { useMutation, useQueryClient } from "@tanstack/react-query";
import EXPLORER_CONFIG from "@core-plugins/file-explorer";
import { DEFAULT_DOCUMENT_VALUES } from "../constants";
import { systemApi } from "@system/api";
import type { NodeMetadataList } from "@system/entry/categories/node/core/schema";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => systemApi.node.create(DEFAULT_DOCUMENT_VALUES),

    onSuccess: (newDoc) => {
      queryClient.setQueryData<NodeMetadataList>(
        systemApi.node.keys.list(EXPLORER_CONFIG),
        (oldData = []) => [...oldData, newDoc],
      );
    },
  });
};

export default useCreateDocument;
