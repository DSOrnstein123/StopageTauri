import PageWrapper from "@/app/components/page/PageWrapper";
import { createFileRoute } from "@tanstack/react-router";
import documentKeys from "../-hooks/documentKeys";
import { invoke } from "@tauri-apps/api/core";
import type { Document, DocumentContent } from "../-schemas/documentSchema";

export const Route = createFileRoute("/(features)/documents/$documentId")({
  component: PageWrapper,
  loader: async ({ context: { queryClient }, params }) => {
    const [documents, documentContent] = await Promise.all([
      queryClient.ensureQueryData({
        queryKey: documentKeys.lists(),
        queryFn: () => invoke<Document[]>("get_document_list"),
        staleTime: Infinity,
      }),
      invoke<DocumentContent>("get_document_content", {
        id: params.documentId,
      }),
    ]);

    const title =
      documents.find((doc) => doc.id === params.documentId)?.title ?? "";

    return { title, documentContent };
  },
  staleTime: 0,
});
