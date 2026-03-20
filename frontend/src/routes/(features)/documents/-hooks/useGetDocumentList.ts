import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { DocumentListSchema } from "../-schemas/documentSchema";
import zodCheck from "@/shared/utils/zodCheck";

const useGetDocumentList = () => {
  return useQuery({
    queryKey: ["document-list"],
    queryFn: async () => {
      const raw = await invoke("get_document_list");
      const result = zodCheck(DocumentListSchema, raw);
      return result;
    },
  });
};

export { useGetDocumentList };
