import { Card } from "@/shared/components/shadcn/card";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useParams } from "@tanstack/react-router";
import DeckItemHeader from "./DeckItemHeader";
import DeckItemChildren from "./DeckItemChildren";
import { Separator } from "@/shared/components/shadcn/separator";
import type { DeckNode } from "../../-types/flashcard.types";

const DeckItem = ({
  data,
  className,
}: {
  data: DeckNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hasChildren = data.children.length > 0;

  const { deckId } = useParams({ strict: false });
  const isSelected = deckId === data.id;

  return (
    <Card
      className={cn(
        `relative gap-0 overflow-hidden rounded-lg border border-zinc-200 py-0 shadow-sm ${className}`,
        isSelected &&
          `before:absolute before:-top-4 before:left-0 before:h-20 before:w-2 before:bg-amber-200 before:content-[""]`,
      )}
    >
      <DeckItemHeader
        data={data}
        hasChildren={hasChildren}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
      <Separator className="absolute top-16" />

      {hasChildren && <DeckItemChildren data={data} isOpen={isOpen} />}
    </Card>
  );
};

export default DeckItem;
