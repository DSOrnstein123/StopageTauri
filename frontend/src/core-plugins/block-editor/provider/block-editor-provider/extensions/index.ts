import { StarterKit, Placeholder } from "@system/lib/tiptap";
import CustomLink from "./custom-link/customLink";
import SlashCommandExtension from "./slash-command/slashCommands";
import ContentBlock from "./content-block/contentBlock";
import { FloatDragExtension } from "./dnd/floatDragExtension";
import { Column } from "./column/column";
import { ColumnContainer } from "./column/columnContainer";
import { CustomCodeBlock } from "./custom-code-block/CustomCodeBlock";
import { createLowlight, all } from "lowlight";
import { extensionRegistry } from "../extensionRegistry";
import { SemanticHighlight } from "./semantic-highlight/semanticHighlight";

const lowlight = createLowlight(all);

export const richTextEditorExtensions = [
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
    enableTabIndentation: true,
    tabSize: 2,
  }),
  SemanticHighlight,
  ...extensionRegistry.getAllExtensions(),
];
