import { useGetNodes } from "@system/features/node/hooks/useGetNodes";
import { EXPLORER_CONFIG } from "../constants";
import type { FileMetadataList } from "@system/features/node/schemas/fileSchema";
import type { FolderMetadataList } from "@system/features/node/schemas/folderSchema";

const useGetExplorerFiles = () => {
  return useGetNodes<FileMetadataList | FolderMetadataList>(EXPLORER_CONFIG);
};

export default useGetExplorerFiles;
