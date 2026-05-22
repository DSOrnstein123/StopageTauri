import EXPLORER_CONFIG from "@core-plugins/file-explorer";
import { nodeKeys } from "@system/domain/node/keys";
import type { NodeMetadataList } from "@system/domain/node/schemas/nodeSchema";
import { nodeService } from "@system/domain/node/services";
import { queryClient } from "@system/queryClient";
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
