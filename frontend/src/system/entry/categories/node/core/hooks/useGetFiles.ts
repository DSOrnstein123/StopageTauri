import type { FileMetadataList } from "../../kinds/file/schema";
import { useGetNodes } from "./useGetNodes";

const useGetFiles = () => {
  return useGetNodes<FileMetadataList>({ includeKinds: ["file"] });
};

export default useGetFiles;
