import StarterKit from "@tiptap/starter-kit";
import CustomLink from "./custom-link/customLink";
import SlashCommandExtension from "./slash-command/slashCommands";
import ContentBlock from "./content-block/contentBlock";
import { Placeholder } from "@tiptap/extensions";
import { FloatDragExtension } from "./dnd/floatDragExtension";
import { Column } from "./column/column";
import { ColumnContainer } from "./column/columnContainer";
import { CustomCodeBlock } from "./custom-code-block/CustomCodeBlock";
import { createLowlight, all } from "lowlight";
import CollectionNode from "./collection/CollectionNode";
import { extensionRegistry } from "../extensionRegistry";

const lowlight = createLowlight(all);

export const extensionList = [
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
  CollectionNode,
  ...extensionRegistry.getAllExtensions(),
];
