import { useMutation } from "@tanstack/react-query";
import { useCollectionNode } from "./context/useCollectionNodeContext";
import { invoke } from "@tauri-apps/api/core";
import type { Document } from "@/features/document/schemas/documentSchema";

const AddRowButton = () => {
  const { collectionId } = useCollectionNode();
  const { mutate: createDocumentInCollection } = useMutation({
    mutationFn: () =>
      invoke<Document>("create_document_in_collection", {
        collectionId: collectionId,
      }),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return <button onClick={() => createDocumentInCollection()}>add row</button>;
};

export default AddRowButton;
