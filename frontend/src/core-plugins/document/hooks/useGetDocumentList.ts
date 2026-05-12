import { useQuery } from "@tanstack/react-query";
import { nodeService } from "@system/domain/node/services/nodeService";
import { nodeKeys } from "@system/domain/node/keys/nodeKeys";
import { pluginRegistry } from "@system/registries/pluginRegistry";

const useGetDocumentList = () => {
  return useQuery({
    queryKey: nodeKeys.list("file"),
    queryFn: async () => {
      const rawData = await nodeService.getList({
        includeGroups: "file",
        includeTypes: "document",
      });
      const schema = pluginRegistry.getSchema("document");
      if (!schema) throw new Error();
      return schema.parse(rawData);
    },
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export { useGetDocumentList };
