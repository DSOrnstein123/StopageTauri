import StarterKit from "@tiptap/starter-kit";
import CustomLink from "../../../routes/(features)/document/tiptap/extensions/custom-link/customLink";
import SlashCommandExtension from "../../../routes/(features)/document/tiptap/extensions/slash-command/slashCommands";
import ContentBlock from "../../../routes/(features)/document/tiptap/extensions/block-node/contentBlock";
import { Placeholder } from "@tiptap/extensions";
import { FloatDragExtension } from "../../../routes/(features)/document/tiptap/extensions/dnd/floatDragExtension";
import { Column } from "../../../routes/(features)/document/tiptap/extensions/column/column";
import { ColumnContainer } from "../../../routes/(features)/document/tiptap/extensions/column/columnContainer";
import { CustomCodeBlock } from "../../../routes/(features)/document/tiptap/extensions/custom-code-block/CustomCodeBlock";
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
