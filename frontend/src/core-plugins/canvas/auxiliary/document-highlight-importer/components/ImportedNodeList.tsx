import { useCurrentNodeId } from "@system/workbench/core/hooks/useCurrentNodeId";
import { useResourceImportsByNode } from "../hooks/useResourceImportsByNode";
import { useGetDetailsQuery } from "@system/entry/categories/node/core/hooks/useGetDetailsQuery";
import { useQueries } from "@tanstack/react-query";
import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import { ImportedNodeItem } from "./ImportedNodeItem";
import type { NodeDetail } from "@system/entry/categories/node/core/schema";

export const ImportedNodeList = () => {
  const id = useCurrentNodeId();

  const { data: resourceImportsByNode = {} } = useResourceImportsByNode(id);
  const nodeIds = Object.keys(resourceImportsByNode);
  useGetDetailsQuery(nodeIds);

  const queries = useQueries({
    queries: nodeIds.map((nodeId) => ({
      ...getNodeDetailQueryOptions(nodeId),
      enabled: false,
    })),
  });

  const nodes = queries
    .map((query) => query.data)
    .filter((node): node is NodeDetail => !!node);
  console.log(nodes);
  return (
    <div className="flex flex-col">
      {nodes.map((node) => (
        <ImportedNodeItem key={node.id} id={node.id} />
      ))}
    </div>
  );
};
