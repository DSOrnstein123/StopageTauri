import { BubbleMenu } from "@tiptap/react/menus";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@system/ui/shadcn/button";
import { useState } from "react";
import LinkSuggestion from "./LinkSuggestion";
import type { DocumentFile } from "@core-plugins/document/schemas/documentSchema";
import { cn } from "@system/lib/tailwind-css/utils";

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

  const handleSelectDocument = (document: DocumentFile) => {
    editor
      .chain()
      .focus()
      .setMark("link", {
        href: `/documents/${document.id}`,
        "data-type": "note",
        "data-document-id": document.id,
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

              {showLinkSuggestion && (
                <LinkSuggestion onSelect={handleSelectDocument} />
              )}
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

export { CustomBubbleMenu };
