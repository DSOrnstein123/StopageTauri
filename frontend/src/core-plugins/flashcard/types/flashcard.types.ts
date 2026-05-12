interface Deck {
  id: string;
  name: string;
  parentId: string | null;
  // description?: string;
  // cards: Card[];
  // subDecks?: Deck[];
}

interface FlashCard {
  id: string;
  front: string;
  back: string;
  // status?: "new" | "learn" | "due"
}

type DeckNode = Deck & { children: DeckNode[] };

interface DeckTree {
  map: Map<string, DeckNode>;
  roots: DeckNode[];
}

export type { Deck, FlashCard, DeckNode, DeckTree };
