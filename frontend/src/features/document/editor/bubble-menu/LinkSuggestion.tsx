import documentKeys from "@features/document/keys/documentKeys";
import type { DocumentFile } from "@features/document/schemas/documentSchema";
import { Input } from "@shared/components/shadcn/input";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const LinkSuggestion = ({
  onSelect,
}: {
  onSelect: (document: DocumentFile) => void;
}) => {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const documentList =
    //TODO: fix
    queryClient.getQueryData<DocumentFile[]>(documentKeys.lists()) ?? [];
  const filtered = documentList.filter((document) =>
    document.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="absolute top-full left-0 mt-2 w-80 rounded-md border bg-white p-2">
      <Input
        placeholder="Paste link or search files"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div className="mt-2 flex max-h-20 flex-col gap-x-1 overflow-x-auto">
        {filtered.map((document) => (
          <div key={document.id} onClick={() => onSelect(document)}>
            {document.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkSuggestion;
