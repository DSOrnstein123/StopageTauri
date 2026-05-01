import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";

export const useGetFiles = () => {
  return useQuery({
    queryKey: fileKeys.list(),
    queryFn: async () => {
      const fileList = await fileService.getList();
      return fileList;
    },
    staleTime: Infinity,
  });
};
