import { useCurrentNodeId } from "@system/workbench/core/hooks/useCurrentNodeId";
import { useResourceImportsByNode } from "../hooks/useResourceImportsByNode";
import { useGetDetailsQuery } from "@system/entry/categories/node/core/hooks/useGetDetailsQuery";
import { useQueryClient } from "@tanstack/react-query";
import { nodeKeys } from "@system/entry/categories/node/core/keys";
import type { NodeDetail } from "@system/entry/categories/node/core/schema";

export const ImportedNodeList = () => {
  const id = useCurrentNodeId();
  const queryClient = useQueryClient();
  const { data: resourceImportsByNode = [] } = useResourceImportsByNode(id);
  const nodeIds = resourceImportsByNode.map(
    (resourceImport) => resourceImport.nodeId,
  );
  useGetDetailsQuery(nodeIds);

  return (
    <div className="flex flex-col">
      {resourceImportsByNode?.map((resourceImport) => {
        const nodeId = resourceImport.nodeId;
        const nodeData = queryClient.getQueryData<NodeDetail>(
          nodeKeys.detail(nodeId),
        );

        if (!nodeData) {
          throw new Error(`Node ${nodeId} not found`);
        }

        return <div key={nodeData.id}>{nodeData.name}</div>;
      })}
    </div>
  );
};
