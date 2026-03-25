import FlashCardsLayout from "@/routes/(features)/flashcards/-components/FlashCardsLayout";
import setSidebarType from "@/shared/utils/setSidebarType";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/flashcards")({
  component: FlashCardsLayout,
  staticData: {
    breadcrumb: "Flashcards",
  },
  beforeLoad: () => {
    setSidebarType("flashcards");
  },
});
