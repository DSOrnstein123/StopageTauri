import { queryOptions, useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { Card } from "../-schemas/cardSchema";

const useGetCardsFromDeck = (deckId: string) => {
  return useQuery({
    queryKey: ["cards", deckId],
    queryFn: () => invoke<Card[]>("get_cards_from_deck", { deckId: deckId }),
    enabled: !!deckId,
  });
};

const deckCardsQueryOptions = (deckId: string) =>
  queryOptions({
    queryKey: ["cards", deckId],
    queryFn: () => invoke<Card[]>("get_cards_from_deck", { deckId: deckId }),
  });

export { useGetCardsFromDeck, deckCardsQueryOptions };
