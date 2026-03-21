import PageWrapper from "@/app/components/page/PageWrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/documents/$documentId/")({
  component: PageWrapper,
});
