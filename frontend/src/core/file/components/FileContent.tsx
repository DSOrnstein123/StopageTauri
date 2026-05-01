import { fileKeys } from "../keys/fileKeys";
import { fileComponents } from "./fileComponents";
import { fileService } from "../services/fileService";
import { useQuery } from "@tanstack/react-query";

const FileContent = ({ id }: { id: string }) => {
  const { data } = useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    staleTime: Infinity,
  });

  if (!data) return null;

  const ContentComponent = fileComponents[data.type];

  return (
    <div>
      <ContentComponent />
    </div>
  );
};

export default FileContent;
