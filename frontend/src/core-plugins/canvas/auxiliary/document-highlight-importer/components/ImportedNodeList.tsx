import { useCurrentNodeId } from "@system/workbench/core/hooks/useCurrentNodeId";
import { useResourceImportsByNode } from "../hooks/useResourceImportsByNode";
import { useGetDetailsQuery } from "@system/entry/categories/node/core/hooks/useGetDetailsQuery";
import { useQueries } from "@tanstack/react-query";
import { nodeKeys } from "@system/entry/categories/node/core/keys";
import { nodeService } from "@system/entry/categories/node/core/service";
import type { NodeDetail } from "@system/entry/categories/node/core/schema";

export const ImportedNodeList = () => {
  const id = useCurrentNodeId();
  const { data: resourceImportsByNode = {} } = useResourceImportsByNode(id);
  const nodeIds = Object.keys(resourceImportsByNode);
  // useGetDetailsQuery(nodeIds);

  const queries = useQueries({
    queries: nodeIds.map((nodeId) => ({
      queryKey: nodeKeys.detail(nodeId),
      queryFn: async () => {
        const data = await nodeService.getDetail(nodeId);
        console.log("query result", nodeId, data);
        return data;
      },
    })),
  });

  const nodes = queries.map((query) => query.data);

  return (
    <div className="flex flex-col">
      {nodes.map((node) => (
        <div key={node?.id}>{node?.name}</div>
      ))}
    </div>
  );
};
