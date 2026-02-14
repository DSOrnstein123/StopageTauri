import { createFileRoute } from "@tanstack/react-router";
import FlashCardsPage from "./-components/FlashCardsPage";

export const Route = createFileRoute("/(features)/flashcards/")({
  component: FlashCardsPage,
});
