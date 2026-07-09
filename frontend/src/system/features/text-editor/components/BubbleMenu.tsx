import { BubbleMenu, Editor, useEditorState } from "@system/lib/tiptap";
import { Button } from "@system/ui/shadcn/button";
import { useState } from "react";
import LinkSuggestion from "./LinkSuggestion";
import { cn } from "@system/lib/tailwind-css/utils";
import type { NodeMetadata } from "@system/features/node/schemas/nodeSchema";

//TODO: optimize
//TODO: fixed position
//TODO: not appear when select from right to left
interface ToolbarButton {
  label: string;
  highlighted: boolean;
  action: () => void;
}

const CustomBubbleMenu = ({ editor }: { editor: Editor }) => {
  const [showLinkSuggestion, setShowLinkSuggestion] = useState(false);

  const { isBold, isItalic, isStrike } = useEditorState({
    editor: editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isStrike: editor.isActive("strike"),
    }),
  });

  const handleSelect = (nodeMetadata: NodeMetadata) => {
    editor
      .chain()
      .focus()
      .setMark("link", {
        href: `/documents/${nodeMetadata}`,
        "data-type": "note",
        "data-document-id": nodeMetadata,
      })
      .run();

    setShowLinkSuggestion(false);
  };

  const toolbarButtons: ToolbarButton[] = [
    {
      label: "Bold",
      highlighted: isBold,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      highlighted: isItalic,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strike",
      highlighted: isStrike,
      action: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Link",
      highlighted: showLinkSuggestion,
      action: () => setShowLinkSuggestion((prev) => !prev),
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: "bottom", offset: 8, flip: true }}
      className="bg-white"
    >
      <div className="flex gap-x-1 rounded-md border p-1">
        {toolbarButtons.map((button, index) =>
          button.label == "Link" ? (
            <div key={index} className="relative">
              <Button
                onClick={button.action}
                className={cn(
                  "hover:bg-secondary rounded-sm border-0 bg-white p-2 text-black shadow-white outline-0",
                  button.highlighted && "bg-red-400",
                )}
              >
                {button.label}
              </Button>

              {showLinkSuggestion && <LinkSuggestion onSelect={handleSelect} />}
            </div>
          ) : (
            <Button
              key={index}
              onClick={button.action}
              className={cn(
                "hover:bg-secondary rounded-sm border-0 bg-white p-2 text-black shadow-white outline-0",
                button.highlighted && "bg-red-400",
              )}
            >
              {button.label}
            </Button>
          ),
        )}
      </div>
    </BubbleMenu>
  );
};

export { CustomBubbleMenu as BubbleMenu };
