import { createFileRoute } from "@tanstack/react-router";
import MangaReader from "./MangaReader";

export const Route = createFileRoute("/(plugins)/external-link-view/")({
  component: MangaReader,
});
