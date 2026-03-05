import { Image, RectangleHorizontal, type LucideIcon } from "lucide-react";
import { type Editor, type Range } from "@tiptap/react";

interface CommandItemProps {
  name: string;
  icon: LucideIcon;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

const commands: CommandItemProps[] = [
  {
    name: "Image",
    icon: Image,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContent({
          type: "content-block",
        })
        .run();
    },
  },
  {
    name: "Callout",
    icon: RectangleHorizontal,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContent({
          type: "content-block",
        })
        .run();
    },
  },
];

export { commands, type CommandItemProps };
