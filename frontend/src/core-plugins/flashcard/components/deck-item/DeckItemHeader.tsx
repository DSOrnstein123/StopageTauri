import { CardHeader, CardTitle } from "@system/shared/ui/shadcn/card";
import { cn } from "@system/lib/tailwind-css/utils";
import { ChevronRight } from "lucide-react";
import DraftInput from "./DraftInput";
import { Link } from "@tanstack/react-router";
import type { DeckNode } from "../../types/flashcard.types";
import useDeckTreeStore from "../../stores/deckTreeStore";

const DeckItemHeader = ({
  data,
  isOpen,
  hasChildren,
  onToggle,
}: {
  data: DeckNode;
  isOpen: boolean;
  hasChildren: boolean;
  onToggle: () => void;
}) => {
  const setTreeFocusId = useDeckTreeStore((state) => state.setTreeFocusId);
  const isDraft = data.id.includes("draft");

  return (
    <CardHeader className={cn("my-4 flex items-center", isDraft && "my-3")}>
      {hasChildren && (
        <ChevronRight
          className={cn(
            "rounded-md transition-transform duration-400 ease-in-out hover:bg-red-50",
            isOpen && "rotate-90",
          )}
          onClick={onToggle}
        />
      )}

      {!isDraft ? (
        <Link
          to={"/flashcards/$deckId"}
          params={{ deckId: data.id }}
          onClick={() => setTreeFocusId(data.id)}
        >
          <CardTitle className="truncate text-xl font-medium">
            {data.name}
          </CardTitle>
        </Link>
      ) : (
        <DraftInput />
      )}
    </CardHeader>
  );
};

export default DeckItemHeader;
