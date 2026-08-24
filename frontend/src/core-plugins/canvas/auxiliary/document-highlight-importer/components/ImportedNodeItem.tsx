import { getHighlightsFromJSONContent } from "@core-plugins/block-editor/provider/block-editor-provider/features/highlight/getHighlightsFromJSONContent";
import { useGetNodeDetailQuery } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import { Button } from "@system/shared/ui/shadcn/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@system/shared/ui/shadcn/collapsible";
import { type JSONContent } from "@tiptap/react";
import { memo } from "react";

export const ImportedNodeItem = memo(({ id }: { id: string }) => {
  //TODO: change to use useGetNodeData after seperating cache into metadata and data
  const { data } = useGetNodeDetailQuery<"document">(id);

  const highlights = data?.data
    ? getHighlightsFromJSONContent(data.data as JSONContent)
    : [];

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full">
          {data?.name}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {highlights.map((highlight) => (
          <div key={highlight.id}>{highlight.text}</div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
});
