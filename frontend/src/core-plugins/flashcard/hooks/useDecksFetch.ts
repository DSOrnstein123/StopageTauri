// import { mapDeck } from "@/mapping/map"
import { queryOptions, useQuery } from "@tanstack/react-query";
import { type Deck } from "../types/flashcard.types";
import { invoke } from "@tauri-apps/api/core";
import type { RawDeck } from "../schemas/deckSchema";

export interface DecksData {
  decksFlat: Deck[];
  decks: Deck[];
  totalCount: number;
}

const useDecksFetch = () => {
  return useQuery({
    queryKey: ["decks"],
    queryFn: async () => {
      const res = await invoke<RawDeck[]>("get_decks");
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });
};

const decksFetchQueryOption = queryOptions({
  queryKey: ["decks"],
  queryFn: async () => {
    const res = await invoke<RawDeck[]>("get_decks");
    return res;
  },
  staleTime: 5 * 60 * 1000,
});

// const useDeckFetchById = (deckId: string, initialData?: Deck | undefined ) => {
//   return useQuery({
//     queryKey: ["decks", deckId],
//     queryFn: async () => {
//       const data = await GetDeckById(deckId)
//       return data
//     },
//     staleTime: 5 * 60 * 1000,
//     enabled: !!deckId,
//     initialData: initialData
//   })
// }

export { useDecksFetch, decksFetchQueryOption };
