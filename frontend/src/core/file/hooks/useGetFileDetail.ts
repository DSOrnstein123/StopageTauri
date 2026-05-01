import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";

export const useGetFileDetail = (id: string) => {
  return useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    staleTime: Infinity,
  });
};
