import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import type { DocumentContent } from "../-schemas/documentSchema";

export const Route = createFileRoute("/(features)/documents/$documentId")({
  loader: ({ params }) =>
    invoke<DocumentContent>("get_document_content", { id: params.documentId }),
});
