import { createFileRoute } from "@tanstack/react-router";
import DeckDetails from "../-components/deck-detail/DeckDetails";

export const Route = createFileRoute("/(features)/flashcards/$deckId/")({
  component: DeckDetails,
});
