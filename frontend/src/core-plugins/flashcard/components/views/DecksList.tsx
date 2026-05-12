import { useDecksFetch } from "../../hooks/useDecksFetch";
import useDeckTreeStore from "../../stores/deckTreeStore";
import DeckItem from "../deck-item/DeckItem";
import { buildDeckTree } from "./tree";
import { useMemo } from "react";

const DecksList = () => {
  const { data: decks = [] } = useDecksFetch();
  const draft = useDeckTreeStore((state) => state.draft);
  const { roots: deckTree } = useMemo(
    () => buildDeckTree(draft ? [...decks, draft] : [...decks]),
    [decks, draft],
  );

  return (
    <div className="flex flex-col gap-y-2">
      {deckTree.map((deck) => (
        <DeckItem key={deck.id} data={deck} />
      ))}
    </div>
  );
};

export default DecksList;
