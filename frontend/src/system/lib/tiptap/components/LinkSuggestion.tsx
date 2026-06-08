import { Input } from "@system/ui/shadcn/input";
import useGetFiles from "@system/features/node/hooks/useGetFiles";
import { useState } from "react";
import type { NodeMetadata } from "@system/features/node/schemas/nodeSchema";

const LinkSuggestion = ({
  onSelect,
}: {
  onSelect: (nodeMetadata: NodeMetadata) => void;
}) => {
  const [query, setQuery] = useState("");
  const { data: fileList } = useGetFiles();
  const filtered = fileList?.filter((nodeMetadata) =>
    nodeMetadata.name.toLowerCase().includes(query.toLowerCase()),
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
        {filtered?.map((file) => (
          <div key={file.id} onClick={() => onSelect(file)}>
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkSuggestion;
