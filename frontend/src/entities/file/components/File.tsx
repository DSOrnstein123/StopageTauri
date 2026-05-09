import FileHeader from "./FileHeader";
import FileProvider from "../context/FileProvider";
import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";
import FileNameLabel from "./FileNameLabel";
import { resolveComponent } from "@shared/lib/registry/resolveComponent";

const File = ({ id }: { id: string }) => {
  const value = {
    id: id,
  };

  const { data } = useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    staleTime: Infinity,
  });
  if (!data) return null;

  /* eslint-disable react-hooks/static-components */
  const FileContent = resolveComponent(data.type);
  if (!FileContent) return null;

  return (
    <FileProvider props={value}>
      <div className="relative h-full">
        <FileHeader className="fixed top-0 left-0 h-10 w-full" />
        <FileNameLabel className="absolute top-10 left-0" />

        <div className="h-full overflow-auto pt-10">
          <FileContent data={data} />
        </div>
      </div>
    </FileProvider>
  );
};

export default File;
