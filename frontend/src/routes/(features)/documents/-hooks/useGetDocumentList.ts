import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { DocumentListSchema } from "../-schemas/documentSchema";
import zodCheck from "@/shared/utils/zodCheck";
import documentKeys from "./documentKeys";

const useGetDocumentList = () => {
  return useQuery({
    queryKey: documentKeys.lists(),
    queryFn: async () => {
      const raw = await invoke("get_document_list");
      const result = zodCheck(DocumentListSchema, raw);
      return result;
    },
  });
};

export { useGetDocumentList };
