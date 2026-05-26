import type { FileMetadataList } from "../schemas/fileSchema";
import { useGetNodes } from "./useGetNodes";

const useGetFiles = () => {
  return useGetNodes<FileMetadataList>({ includeKinds: ["file"] });
};

export default useGetFiles;
