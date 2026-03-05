import { createFileRoute } from "@tanstack/react-router";
import PdfReader from "./-components/PdfReader";
import setSidebarType from "@/shared/utils/setSidebarType";

export const Route = createFileRoute("/(features)/pdf-reader")({
  component: PdfReader,
  beforeLoad: () => {
    setSidebarType("pdf");
  },
});
