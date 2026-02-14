import { createFileRoute } from "@tanstack/react-router";
import SpinePlayer from "../spine-player/SpinePlayer";

export const Route = createFileRoute("/(plugins)/spine")({
  component: SpinePlayer,
});
