import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";

const useFileName = (id: string) =>
  useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    select: (data) => data.name,
    staleTime: Infinity,
  });

export default useFileName;
