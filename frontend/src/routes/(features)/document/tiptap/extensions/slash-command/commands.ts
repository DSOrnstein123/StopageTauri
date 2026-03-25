import {
  CodeXml,
  Image,
  RectangleHorizontal,
  type LucideIcon,
} from "lucide-react";
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
  {
    name: "Column",
    icon: RectangleHorizontal,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: "column-container",
          content: [
            {
              type: "column",
              content: [{ type: "paragraph" }],
            },
            {
              type: "column",
              content: [{ type: "paragraph" }],
            },
          ],
        })
        .run();
    },
  },
  {
    name: "Code Block",
    icon: CodeXml,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run();
    },
  },
];

export { commands, type CommandItemProps };
