import debounce from "@shared/utils/debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";
import type { File } from "../schemas/fileSchema";

const useFileName = (fileId: string, setTitle: (newTitle: string) => void) => {
  const queryClient = useQueryClient();
  const { data: name } = useQuery({
    queryKey: fileKeys.detail(fileId),
    queryFn: () => fileService.getDetail(fileId),
    select: (data) => data.name,
    staleTime: Infinity,
  });
  const [currentName, setCurrentName] = useState(name || "");

  useEffect(() => {
    if (!name) return;

    setTitle(name);
  }, [name, setTitle]);

  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newName) => {
      fileService.updateName(id, newName);
    }, 500),
  ).current;

  const handleBlur = () => {
    saveTitle.flush(fileId, currentName);
  };

  const handleInput = (e: FormEvent<HTMLHeadingElement>) => {
    const newName = e.currentTarget.textContent || "";
    setCurrentName(newName);
    setTitle(newName);

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

  return { currentName, handleInput, handleBlur };
};

export default useFileName;
