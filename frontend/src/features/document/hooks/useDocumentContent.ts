import { fileKeys } from "@entities/file/keys/fileKeys";
import { fileService } from "@entities/file/services/fileService";
import { useQuery } from "@tanstack/react-query";

const useDocumentContent = (id: string) => {
  return useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    select: (data) => data.content,
    staleTime: Infinity,
  });
};

export default useDocumentContent;
