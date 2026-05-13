import { useQuery } from "@tanstack/react-query";
import { nodeService } from "@system/domain/node/services/nodeService";
import { nodeKeys } from "@system/domain/node/keys/nodeKeys";
import { pluginRegistry } from "@system/registries/pluginRegistry";

const useGetDocuments = () => {
  return useQuery({
    queryKey: nodeKeys.list({
      includeKinds: ["file"],
      includeTypes: ["document"],
    }),
    queryFn: async () => {
      const rawData = await nodeService.getList({
        includeKinds: ["file"],
        includeTypes: ["document"],
      });
      const schema = pluginRegistry.getSchema("document");
      if (!schema) throw new Error();
      return schema.parse(rawData);
    },
    staleTime: Infinity,
  });
};

export default useGetDocuments;
