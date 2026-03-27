import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { Document } from "../schemas/documentSchema";
import documentKeys from "./documentKeys";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => invoke<Document>("create_document"),

    onSuccess: (newDoc) => {
      queryClient.setQueryData<Document[]>(
        documentKeys.lists(),
        (oldData = []) => [...oldData, newDoc],
      );
    },
  });
};

export default useCreateDocument;
