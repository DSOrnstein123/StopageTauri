import { useQuery } from "@tanstack/react-query";
import { nodeService } from "@system/features/node/services";
import { nodeKeys } from "@system/features/node/keys";
import { systemApi } from "@system/api";

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
      const schema = systemApi.plugin.getSchema("document");
      if (!schema) throw new Error();
      return schema.parse(rawData);
    },
    staleTime: Infinity,
  });
};

export default useGetDocuments;
