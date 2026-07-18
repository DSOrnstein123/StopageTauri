import { useQueryClient } from "@tanstack/react-query";
import { nodeService } from "@system/features/node/shared/services";
import useCurrentNodeId from "@system/features/workspace/hooks/useCurrentNodeId";
import { nodeKeys } from "@system/features/node/shared/keys";
import type { DocumentTemplateDetail } from "../schemas";
import { TEMPLATE_CONFIG } from "../../../../../template-manager/constants";
import useOptimisticRename from "@system/hooks/useOptimisticRename";
import useGetCurrentNameQuery from "./useGetCurrentNameQuery";
import type { TemplateMetadataList } from "@system/features/node/template/schemas";

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
