import StarterKit from "@tiptap/starter-kit";
import CustomLink from "../tiptap/extensions/custom-link/customLink";
import SlashCommandExtension from "../tiptap/extensions/slash-command/slashCommands";
import ContentBlock from "../tiptap/extensions/block-node/contentBlock";
import { Placeholder } from "@tiptap/extensions";
import { FloatDragExtension } from "../tiptap/extensions/dnd/floatDragExtension";
import { Column } from "../tiptap/extensions/column/column";
import { ColumnContainer } from "../tiptap/extensions/column/columnContainer";
import { CustomCodeBlock } from "../tiptap/extensions/custom-code-block/CustomCodeBlock";
import { createLowlight, all } from "lowlight";

const lowlight = createLowlight(all);

export const extensions = [
  StarterKit.configure({
    dropcursor: false,
    link: false,
    codeBlock: false,
  }),
  CustomLink.configure({
    openOnClick: false,
  }),
  SlashCommandExtension,
  ContentBlock,
  Placeholder.configure({
    showOnlyCurrent: true,
    placeholder: () => {
      return "Press '/' for commands";
    },
  }),
  FloatDragExtension,
  Column,
  ColumnContainer,
  CustomCodeBlock.configure({
    lowlight,
  }),
  // KanbanNode,
];
