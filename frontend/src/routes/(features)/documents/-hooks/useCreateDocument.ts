import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { Document } from "../-schemas/documentSchema";

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => invoke<Document>("create_document"),

    // onSuccess: (data) => {
    //   queryClient.
    // },
  });
};

export default useCreateDocument;
