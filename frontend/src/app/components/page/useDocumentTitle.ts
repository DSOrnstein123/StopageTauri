import documentKeys from "@/routes/(features)/documents/-hooks/documentKeys";
import type { Document } from "@/routes/(features)/documents/-schemas/documentSchema";
import debounce from "@/shared/utils/debounce";
import { useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePanelContext } from "./usePanelParams";

const useDocumentTitle = () => {
  const queryClient = useQueryClient();
  const panelContext = usePanelContext();
  const panelId = panelContext.api.id;
  const panelApi = panelContext.api;
  const documentId = panelContext.params.fileId;
  const [title, setTitle] = useState("");

  useEffect(() => {
    let cancel = false;

    const getTitle = async () => {
      const documentList = await queryClient.ensureQueryData({
        queryKey: documentKeys.lists(),
        queryFn: () => invoke<Document[]>("get_document_list"),
        staleTime: Infinity,
      });

      if (cancel) return;

      const newTitle =
        documentList.find((document) => document.id === documentId)?.title ??
        "";
      setTitle(newTitle);
      panelApi.setTitle(newTitle);
    };
    getTitle();

    return () => {
      cancel = true;
    };
  }, [documentId, panelId, panelApi, queryClient]);

  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newTitle) => {
      invoke("update_title", { id, title: newTitle });
    }, 500),
  ).current;

  const handleInput = (e: FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.textContent || "";
    setTitle(newTitle);
    panelApi.setTitle(newTitle);
    queryClient.setQueryData<Document[]>(documentKeys.lists(), (data = []) =>
      data.map((doc) =>
        doc.id === documentId ? { ...doc, title: newTitle } : doc,
      ),
    );
    saveTitle(documentId, newTitle);
  };

  return { title, handleInput };
};

export default useDocumentTitle;
