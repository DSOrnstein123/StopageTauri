import { createFileRoute } from "@tanstack/react-router";
import StudyPage from "../-components/study/StudyPage";
import { deckCardsQueryOptions } from "../-hooks/useCardsFetch";

export const Route = createFileRoute("/(features)/flashcard/$deckId/study")({
  component: StudyPage,
  loader: ({ context: { queryClient }, params: { deckId } }) => {
    queryClient.ensureQueryData(deckCardsQueryOptions(deckId));
  },
  staticData: {
    breadcrumb: "study",
  },
});
