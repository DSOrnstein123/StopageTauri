import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { nodeKeys } from "../keys/nodeKeys";
import { nodeService } from "../services/nodeService";
import usenodeName from "./useNodeName";
import debounce from "@system/utils/debounce";
import type { NodeDetail, NodeMetadataList } from "../schemas/nodeSchema";

const useRenameNode = (nodeId: string) => {
  const queryClient = useQueryClient();
  const { data: name } = usenodeName(nodeId);
  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newName) => {
      nodeService.updateName(id, newName);
    }, 500),
  ).current;

  const handleBlur = () => {
    if (!name) return;

    saveTitle.flush(nodeId, name);
  };

  const updateName = (newName: string) => {
    queryClient.setQueryData<NodeMetadataList>(nodeKeys.list(), (data = []) =>
      data.map((node) =>
        node.id == nodeId ? { ...node, name: newName } : node,
      ),
    );
    queryClient.setQueryData<NodeDetail>(
      nodeKeys.detail(nodeId),
      (data) =>
        data && {
          ...data,
          name: newName,
        },
    );
    saveTitle(nodeId, newName);
  };

  return { name, updateName, handleBlur };
};

export default useRenameNode;
