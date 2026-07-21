import type { FileMetadataList } from "../../file/schemas";
import { useGetNodes } from "./useGetNodes";

const useGetFiles = () => {
  return useGetNodes<FileMetadataList>({ includeKinds: ["file"] });
};

export default useGetFiles;
