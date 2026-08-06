import { useGetNodes } from "@system/entry/categories/node/core/hooks/useGetNodes";
import { EXPLORER_CONFIG } from "../constants";
import type { FileMetadataList } from "@system/entry/categories/node/kinds/file/schema";
import type { FolderMetadataList } from "@system/entry/categories/node/kinds/folder/schema";

const useGetExplorerFiles = () => {
  return useGetNodes<FileMetadataList | FolderMetadataList>(EXPLORER_CONFIG);
};

export default useGetExplorerFiles;
