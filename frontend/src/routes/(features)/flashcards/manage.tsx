import { createFileRoute } from "@tanstack/react-router";
import Manage from "./-components/manage/Manage";

export const Route = createFileRoute("/(features)/flashcards/manage")({
  component: Manage,
});
