import { Input } from "@/shared/components/shadcn/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { useRef } from "react";
import useDeckTreeStore from "../../-stores/deckTreeStore";
import type { Deck } from "../../-types/flashcard.types";

const DraftInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const draft = useDeckTreeStore((state) => state.draft);
  const clearDraft = useDeckTreeStore((state) => state.clearDraft);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      name,
      parentId,
    }: {
      name: string;
      parentId: string | null;
    }) =>
      invoke<Deck>("create_deck", {
        name: name,
        parentId: parentId ?? null,
      }),

    onSuccess: (data) => {
      clearDraft();

      queryClient.setQueryData<Deck[]>(["decks"], (oldDecks = []) => [
        ...oldDecks,
        data,
      ]);
    },
  });

  return (
    <Input
      ref={inputRef}
      className="px-2 py-0 leading-8.5 font-semibold md:text-xl"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();

          const inputEl = inputRef.current;
          if (!inputEl) return;

          const deckName = inputEl.value.trim();
          mutate({ name: deckName, parentId: draft!.parentId });
        }
      }}
    />
  );
};

export default DraftInput;
