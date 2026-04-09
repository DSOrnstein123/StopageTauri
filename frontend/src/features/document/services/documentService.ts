import { invoke } from "@tauri-apps/api/core";
import type { Document, DocumentContentType } from "../schemas/documentSchema";

export const documentService = {
  getList: async (): Promise<Document[]> => {
    return await invoke("get_document_list");
  },
  create: async (): Promise<Document> => {
    return await invoke("create_document");
  },
  updateContent: async (id: string, content: string): Promise<void> => {
    return await invoke("update_document", { id: id, content: content });
  },
  updateTitle: async (id: string, title: string): Promise<void> => {
    return await invoke("update_title", { id: id, title: title });
  },
  getContent: async (id: string): Promise<DocumentContentType> => {
    return await invoke("get_document_content", { id: id });
  },
};
