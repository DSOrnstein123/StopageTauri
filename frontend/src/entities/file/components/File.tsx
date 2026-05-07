import FileHeader from "./FileHeader";
import FileProvider from "../context/FileProvider";
import type { ComponentType } from "react";
import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";
import FileNameLabel from "./FileNameLabel";

const File = ({
  id,
  resolveComponent,
}: {
  id: string;
  resolveComponent: (type: string) => ComponentType<{ data: unknown }> | null;
}) => {
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
      <div className="relative">
        <FileHeader className="fixed top-0 left-0 h-10" />
        <FileNameLabel className="absolute top-10 left-0" />

        <FileContent data={data} />
      </div>
    </FileProvider>
  );
};

export default File;
