import { useQuery } from "@tanstack/react-query";
import documentKeys from "../keys/documentKeys";
import { documentService } from "../services/documentService";

const useGetDocumentList = () => {
  return useQuery({
    queryKey: documentKeys.lists(),
    queryFn: async () => {
      const raw = await documentService.getList();
      // const result = zodCheck(DocumentListSchema, raw);
      return raw;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export { useGetDocumentList };
