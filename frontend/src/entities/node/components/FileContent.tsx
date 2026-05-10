import { resolveComponent } from "@shared/lib/registry/resolveComponent";
import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";
import { useFileContext } from "../context/FileContext";

const FileContent = () => {
  const { id } = useFileContext();
  const { data } = useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    staleTime: Infinity,
  });
  if (!data) return null;

  /* eslint-disable react-hooks/static-components */
  const Content = resolveComponent(data.type);
  if (!Content) return null;

  return <Content data={data} />;
};

export default FileContent;
