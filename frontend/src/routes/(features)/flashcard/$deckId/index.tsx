import { createFileRoute } from "@tanstack/react-router";
import DeckDetails from "../-components/deck-detail/DeckDetails";

export const Route = createFileRoute("/(features)/flashcard/$deckId/")({
  component: DeckDetails,
});
