import { useTabStore } from "@/app/store/tabStore";
import documentKeys from "@/routes/(features)/documents/-hooks/documentKeys";
import type { Document } from "@/routes/(features)/documents/-schemas/documentSchema";
import debounce from "@/shared/utils/debounce";
import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useRef } from "react";

const route = getRouteApi("/(features)/documents/$documentId");

const useDocumentTitle = () => {
  const activeTabId = useTabStore((state) => state.activeTabId);
  const tabs = useTabStore((state) => state.tabs);
  const updateTabTitle = useTabStore((state) => state.updateTabTitle);
  const queryClient = useQueryClient();
  const { documentId } = route.useParams();

  const title = tabs.find((tab) => tab.id === activeTabId)?.title ?? "";

  const saveTitle = useRef(
    debounce<(id: string, title: string) => void>((id, newTitle) => {
      invoke("update_title", { id, title: newTitle });
    }, 500),
  ).current;

  const handleInput = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.textContent || "";
    updateTabTitle(activeTabId!, newTitle);

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
