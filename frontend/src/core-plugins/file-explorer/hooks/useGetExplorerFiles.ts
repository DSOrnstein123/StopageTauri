import { useGetNodes } from "@system/features/node/shared/hooks/useGetNodes";
import { EXPLORER_CONFIG } from "../constants";
import type { FileMetadataList } from "@system/features/node/file/schemas";
import type { FolderMetadataList } from "@system/features/node/folder/schemas";

const useGetExplorerFiles = () => {
  return useGetNodes<FileMetadataList | FolderMetadataList>(EXPLORER_CONFIG);
};

export default useGetExplorerFiles;
