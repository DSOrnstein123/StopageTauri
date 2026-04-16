import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Document } from "../schemas/documentSchema";
import documentKeys from "../keys/documentKeys";
import { documentService } from "../services/documentService";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => documentService.create(),

    onSuccess: (newDoc) => {
      queryClient.setQueryData<Document[]>(
        documentKeys.lists(),
        (oldData = []) => [...oldData, newDoc],
      );
    },
  });
};

export default useCreateDocument;
