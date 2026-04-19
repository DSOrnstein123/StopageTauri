import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";

const useGetFileList = () => {
  return useQuery({
    queryKey: fileKeys.list(),
    queryFn: async () => {
      const fileList = await fileService.getList();
      return fileList;
    },
    staleTime: Infinity,
  });
};

export default useGetFileList;
