import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCollectionNode } from "../context/useCollectionNodeContext";
import { invoke } from "@tauri-apps/api/core";
import type { DocumentFile } from "@core-plugins/document/entries/nodes/document/schemas/documentSchema";
import collectionKeys from "@core-plugins/collection/keys/collectionKeys";
import { nodeKeys } from "@system/features/node/keys";
import type { NodeMetadataList } from "@system/features/node/schemas/nodeSchema";

const AddDocumentButton = () => {
  const { collectionId } = useCollectionNode();
  const queryClient = useQueryClient();
  const { mutate: createDocumentInCollection } = useMutation({
    mutationFn: () =>
      invoke<DocumentFile>("create_document_in_collection", {
        collectionId: collectionId,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData<NodeMetadataList>(
        collectionKeys.documentList(collectionId),
        (oldData) => [...(oldData ?? []), data],
      );
      queryClient.setQueryData<NodeMetadataList>(
        nodeKeys.lists(),
        (oldData) => [...(oldData ?? []), data],
      );
    },
  });

  return <button onClick={() => createDocumentInCollection()}>add row</button>;
};

export default AddDocumentButton;
