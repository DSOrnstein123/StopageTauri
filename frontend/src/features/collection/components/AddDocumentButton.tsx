import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCollectionNode } from "../context/useCollectionNodeContext";
import { invoke } from "@tauri-apps/api/core";
import type { Document } from "@/features/document/schemas/documentSchema";
import collectionKeys from "@/features/collection/keys/collectionKeys";
import documentKeys from "@/features/document/keys/documentKeys";

const AddDocumentButton = () => {
  const { collectionId } = useCollectionNode();
  const queryClient = useQueryClient();
  const { mutate: createDocumentInCollection } = useMutation({
    mutationFn: () =>
      invoke<Document>("create_document_in_collection", {
        collectionId: collectionId,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData<Document[]>(
        collectionKeys.documentList(collectionId),
        (oldData) => [...(oldData ?? []), data],
      );
      queryClient.setQueryData<Document[]>(documentKeys.lists(), (oldData) => [
        ...(oldData ?? []),
        data,
      ]);
    },
  });

  return <button onClick={() => createDocumentInCollection()}>add row</button>;
};

export default AddDocumentButton;
