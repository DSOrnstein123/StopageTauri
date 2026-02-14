import { createFileRoute } from "@tanstack/react-router";
import PdfReader from "./-components/PdfReader";

export const Route = createFileRoute("/(features)/pdf-reader")({
  component: PdfReader,
});
