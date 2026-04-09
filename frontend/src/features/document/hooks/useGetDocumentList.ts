import { useQuery } from "@tanstack/react-query";
import { DocumentListSchema } from "../schemas/documentSchema";
import zodCheck from "@/shared/utils/zodCheck";
import documentKeys from "./documentKeys";
import { documentService } from "../services/documentService";

const useGetDocumentList = () => {
  return useQuery({
    queryKey: documentKeys.lists(),
    queryFn: async () => {
      const raw = await documentService.getList();
      const result = zodCheck(DocumentListSchema, raw);
      return result;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export { useGetDocumentList };
