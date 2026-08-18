import { nodeService } from "@system/entry/categories/node/core/service";
import { useMutation } from "@tanstack/react-query";

export const useImportNode = () => {
  return useMutation({
    mutationFn: ({
      canvasId,
      nodeId,
    }: {
      canvasId: string;
      nodeId: string;
    }) => {
      return nodeService.patchData<"canvas">(canvasId, {
        resourceImportsByNode: {
          [nodeId]: [],
        },
      });
    },
    onError: (e) => console.log(e),
  });
};
