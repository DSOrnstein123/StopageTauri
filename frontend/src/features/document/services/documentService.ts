import { invoke } from "@tauri-apps/api/core";
import {
  type DocumentFile,
  DocumentFileSchema,
} from "../schemas/documentSchema";
import type { FileDetail } from "@entities/file/schemas/fileSchema";

export const documentService = {
  create: async (): Promise<FileDetail> => {
    return await invoke("create_document");
  },
  updateContent: async (id: string, content: string): Promise<void> => {
    return await invoke("update_document", { id: id, content: content });
  },
  updateTitle: async (id: string, title: string): Promise<void> => {
    return await invoke("update_title", { id: id, title: title });
  },
  getDetail: async (id: string): Promise<DocumentFile> => {
    const rawData = await invoke("get_file_detail", { id: id });
    return DocumentFileSchema.parse(rawData);
  },
};
