import { createFileRoute } from "@tanstack/react-router";
import { decksFetchQueryOption } from "../hooks/useDecksFetch";

export const Route = createFileRoute("/(features)/flashcard/$deckId")({
  loader: async ({ context: { queryClient }, params: { deckId } }) => {
    const decks = await queryClient.ensureQueryData(decksFetchQueryOption);
    const selectedDeck = decks.find((deck) => deck.id === deckId);
    return selectedDeck?.name;
  },
  staticData: {
    breadcrumbFn: (match) => match.loaderData,
  },
});
