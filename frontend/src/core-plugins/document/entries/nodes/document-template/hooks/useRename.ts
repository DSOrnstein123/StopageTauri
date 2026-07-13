import { useQueryClient } from "@tanstack/react-query";
import { nodeService } from "@system/features/node/services";
import useCurrentNodeId from "@system/features/workspace/hooks/useCurrentNodeId";
import type { TemplateMetadataList } from "@system/features/node/schemas/templateSchema";
import { nodeKeys } from "@system/features/node/keys";
import type { DocumentTemplateDetail } from "../schemas/documentTemplateSchema";
import { TEMPLATE_CONFIG } from "../../../../../template-manager/constants";
import useOptimisticRename from "@system/hooks/useOptimisticRename";
import useGetCurrentNameQuery from "./useGetCurrentNameQuery";

const useRename = () => {
  const id = useCurrentNodeId();
  const { data: name } = useGetCurrentNameQuery();
  const queryClient = useQueryClient();

  const { rename, commit } = useOptimisticRename({
    onOptimisticUpdate: (newName) => {
      queryClient.setQueryData<TemplateMetadataList>(
        nodeKeys.list(TEMPLATE_CONFIG),
        (data) =>
          data?.map((node) =>
            node.id == id ? { ...node, name: newName } : node,
          ),
      );
      queryClient.setQueryData<DocumentTemplateDetail>(
        nodeKeys.detail(id),
        (data) =>
          data && {
            ...data,
            data: {
              ...data.data,
              defaultName: newName,
            },
          },
      );
    },
    onCommit: async (newName) => {
      await nodeService.patchData<"document-template">(id, {
        defaultName: newName,
      });
    },
  });

  return { name, rename, commit };
};

export default useRename;
