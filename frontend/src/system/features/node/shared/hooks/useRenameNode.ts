import { useQueryClient } from "@tanstack/react-query";
import { nodeKeys } from "../keys";
import { nodeService } from "../services";
import useNodeName from "./useNodeName";
import type { NodeDetail, NodeMetadataList } from "../schemas";
import useOptimisticRename from "@system/hooks/useOptimisticRename";
import useCurrentNodeId from "@system/features/workspace/hooks/useCurrentNodeId";

const useRenameNode = () => {
  const id = useCurrentNodeId();
  const { data: name } = useNodeName(id);
  const queryClient = useQueryClient();

  const { rename, commit } = useOptimisticRename({
    onOptimisticUpdate: (newName) => {
      queryClient.setQueryData<NodeMetadataList>(nodeKeys.list(), (data = []) =>
        data.map((node) => (node.id == id ? { ...node, name: newName } : node)),
      );
      queryClient.setQueryData<NodeDetail>(
        nodeKeys.detail(id),
        (data) =>
          data && {
            ...data,
            name: newName,
          },
      );
    },
    onCommit: async (newName) => {
      await nodeService.updateName(id, newName);
    },
  });

  return { name, rename, commit };
};

export default useRenameNode;
