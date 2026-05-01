import { usePanelContext } from "@/layout/dockview/panel-context/usePanelParams";
import documentKeys from "@/features/document/keys/documentKeys";
import type { Document } from "@/features/document/schemas/documentSchema";
import debounce from "@/shared/utils/debounce";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { DocumentParams } from "../../../features/document/document.params";
import { documentService } from "../../../features/document/services/documentService";

const useDocumentTitle = () => {
  const queryClient = useQueryClient();
  const panelContext = usePanelContext<DocumentParams>();
  const panelApi = panelContext.api;
  const documentId = panelContext.params.documentId;
  const [title, setTitle] = useState("");

  useEffect(() => {
    let cancel = false;

    const getTitle = async () => {
      const documentList = await queryClient.ensureQueryData({
        queryKey: documentKeys.lists(),
        queryFn: () => documentService.getList(),
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
  }, [documentId, panelApi, queryClient]);

  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newTitle) => {
      documentService.updateTitle(id, newTitle);
    }, 500),
  ).current;

  const handleBlur = () => {
    saveTitle.flush(documentId, title);
  };

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

  return { title, handleInput, handleBlur };
};

export default useDocumentTitle;
