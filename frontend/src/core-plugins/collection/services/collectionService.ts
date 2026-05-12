import { invoke } from "@tauri-apps/api/core";
import type { Collection } from "../tiptap/extensions/collection/collection.types";
import type { Document } from "../schemas/documentSchema";

export const collectionService = {
  get: async (id: string): Promise<Collection> => {
    return await invoke("get_collection", { id });
  },
  create: async (): Promise<Collection> => {
    return await invoke("create_collection");
  },
  createProperty: async (
    collectionId: string,
    name: string,
    propertyType: string,
  ): Promise<unknown> => {
    return await invoke("create_property", {
      collectionId,
      name,
      propertyType,
    });
  },
  createRow: async (collectionId: string): Promise<Document> => {
    return await invoke("create_row", { collectionId });
  },
  createDocument: async (collectionId: string): Promise<Document> => {
    return await invoke("create_document_in_collection", {
      collectionId,
    });
  },
  getDocuments: async (collectionId: string): Promise<Document[]> => {
    return await invoke("get_documents_in_collection", {
      collectionId,
    });
  },
};
