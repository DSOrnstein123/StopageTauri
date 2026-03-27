import type { Deck, DeckNode, DeckTree } from "../../types/flashcard.types";

export const buildDeckTree = (decks: Deck[]): DeckTree => {
  const roots: DeckNode[] = [];

  const deckNodes = new Map<string, DeckNode>();
  decks.forEach((deck) => deckNodes.set(deck.id, { ...deck, children: [] }));

  deckNodes.forEach((deckNode) => {
    if (!deckNode.parentId) {
      roots.push(deckNode);
    } else {
      deckNodes.get(deckNode.parentId)?.children.push(deckNode);
    }
  });

  return {
    map: deckNodes,
    roots: roots,
  };
};
