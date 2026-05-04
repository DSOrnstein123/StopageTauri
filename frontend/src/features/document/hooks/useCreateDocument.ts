import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../services/documentService";
import type { File } from "@/entities/file/schemas/fileSchema";
import { fileKeys } from "@/entities/file/keys/fileKeys";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => documentService.create(),

    onSuccess: (newDoc) => {
      queryClient.setQueryData<File[]>(fileKeys.list(), (oldData = []) => [
        ...oldData,
        newDoc,
      ]);
    },
  });
};

export default useCreateDocument;
