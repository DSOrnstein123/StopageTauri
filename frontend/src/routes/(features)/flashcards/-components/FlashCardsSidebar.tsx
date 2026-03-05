import DecksList from "@/routes/(features)/flashcards/-components/views/DecksList";
import SearchDecksBar from "@/routes/(features)/flashcards/-components/SearchDecksBar";
import { Button } from "@/shared/components/shadcn/button";
import useDeckTreeStore from "../-stores/deckTreeStore";
import { Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";

const FlashCardsSidebar = () => {
  const setDraft = useDeckTreeStore((state) => state.setDraft);
  const focusDeck = useDeckTreeStore((state) => state.treeFocusId);

  return (
    <div className="pb-2">
      <div className="relative my-2 flex gap-x-1">
        <SearchDecksBar />
      </div>

      <div className="flex w-full gap-x-1">
        <Button className="flex-1" onClick={() => setDraft("draft", "New")}>
          New deck
        </Button>

        <Link to="/flashcards/manage">
          <Button>
            <Settings />
          </Button>
        </Link>
      </div>

      <div className="mt-2 flex flex-col gap-y-2">
        <DecksList />
      </div>
    </div>
  );
};

export default FlashCardsSidebar;
