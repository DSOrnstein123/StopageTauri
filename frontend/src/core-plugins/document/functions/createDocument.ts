import EXPLORER_CONFIG from "@core-plugins/file-explorer";
import { nodeKeys } from "@system/features/node/keys";
import type { NodeMetadataList } from "@system/features/node/schemas/nodeSchema";
import { nodeService } from "@system/features/node/services";
import { queryClient } from "@system/config/queryClient";
import { DEFAULT_DOCUMENT_VALUES } from "../constants";

const createDocument = async () => {
  const data = await nodeService.create(DEFAULT_DOCUMENT_VALUES);

  queryClient.setQueryData<NodeMetadataList>(
    nodeKeys.list(EXPLORER_CONFIG),
    (oldData = []) => [...oldData, data],
  );

  return data;
};

export default createDocument;
