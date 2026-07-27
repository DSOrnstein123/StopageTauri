import { BubbleMenu as TiptapBubbleMenu, Editor } from "@system/lib/tiptap";
import { Button } from "@system/shared/ui/shadcn/button";
import LinkSuggestion from "./LinkSuggestion";
import { cn } from "@system/lib/tailwind-css/utils";
import useBubbleMenu from "../hooks/useBubbleMenu";

//TODO: optimize
//TODO: fixed position
//TODO: not appear when select from right to left

const BubbleMenu = ({ editor }: { editor: Editor }) => {
  const { actions, showLinkSuggestion, handleSelect } = useBubbleMenu(editor);

  return (
    <TiptapBubbleMenu
      editor={editor}
      options={{
        placement: "bottom",
        offset: 8,
        flip: true,
      }}
      className="z-50"
    >
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-lg border",
          "bg-popover text-popover-foreground p-1",
          "shadow-lg shadow-black/10",
        )}
      >
        {actions.map((action) => {
          const Icon = action.icon;
          const isLinkAction = action.id === "link";

          return (
            <div
              key={action.id}
              className={cn(
                "relative flex items-center",
                action.separated && "ml-1 border-l pl-1",
              )}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={action.action}
                className={cn(
                  "size-8 rounded-md",
                  "text-muted-foreground",
                  "hover:bg-accent hover:text-accent-foreground",
                  action.highlighted && "bg-accent text-accent-foreground",
                )}
              >
                <Icon className="size-4" />
              </Button>

              {isLinkAction && showLinkSuggestion && (
                <div className="absolute top-full left-0 z-50 mt-2">
                  <LinkSuggestion onSelect={handleSelect} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TiptapBubbleMenu>
  );
};

export default BubbleMenu;
