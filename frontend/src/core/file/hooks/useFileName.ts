import debounce from "@/shared/utils/debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePanelContext } from "@/core/layout/dockview/panel-context/usePanelParams";
import { useFileIdContext } from "../context/FileIdContext";
import { fileKeys } from "../keys/fileKeys";
import { fileService } from "../services/fileService";
import type { File } from "../schemas/fileSchema";

const useFileName = () => {
  const queryClient = useQueryClient();
  const panelContext = usePanelContext();
  const panelApi = panelContext.api;
  const id = useFileIdContext();
  const [currentName, setCurrentName] = useState("");
  const { data: name } = useQuery({
    queryKey: fileKeys.detail(id),
    queryFn: () => fileService.getDetail(id),
    select: (data) => data.name,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!name) return;

    setTimeout(() => {
      setCurrentName(name);
      panelApi.setTitle(name);
    }, 0);
  }, [name, panelApi]);

  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newName) => {
      fileService.updateName(id, newName);
    }, 500),
  ).current;

  const handleBlur = () => {
    saveTitle.flush(id, currentName);
  };

  const handleInput = (e: FormEvent<HTMLHeadingElement>) => {
    const newName = e.currentTarget.textContent || "";
    setCurrentName(newName);
    panelApi.setTitle(newName);

    queryClient.setQueryData<File[]>(fileKeys.list(), (data = []) =>
      data.map((file) => (file.id == id ? { ...file, name: newName } : file)),
    );
    queryClient.setQueryData<File>(
      fileKeys.detail(id),
      (data) =>
        data && {
          ...data,
          name: newName,
        },
    );
    saveTitle(id, newName);
  };

  return { currentName, handleInput, handleBlur };
};

export default useFileName;
