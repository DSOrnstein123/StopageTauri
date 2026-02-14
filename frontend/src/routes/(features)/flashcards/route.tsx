import FlashCardsLayout from "@/routes/(features)/flashcards/-components/FlashCardsLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/flashcards")({
  component: FlashCardsLayout,
  staticData: {
    breadcrumb: "Flashcards",
  },
});
