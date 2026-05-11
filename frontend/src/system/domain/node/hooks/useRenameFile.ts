import debounce from "@shared/utils/debounce";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";
import type { File } from "../schemas/fileSchema";
import useFileName from "./useFileName";

const useRenameFile = (fileId: string) => {
  const queryClient = useQueryClient();
  const { data: name } = useFileName(fileId);
  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newName) => {
      fileService.updateName(id, newName);
    }, 500),
  ).current;

  const handleBlur = () => {
    if (!name) return;

    saveTitle.flush(fileId, name);
  };

  const updateName = (newName: string) => {
    queryClient.setQueryData<File[]>(fileKeys.list(), (data = []) =>
      data.map((file) =>
        file.id == fileId ? { ...file, name: newName } : file,
      ),
    );
    queryClient.setQueryData<File>(
      fileKeys.detail(fileId),
      (data) =>
        data && {
          ...data,
          name: newName,
        },
    );
    saveTitle(fileId, newName);
  };

  return { name, updateName, handleBlur };
};

export default useRenameFile;
