import { mergeAttributes, Node } from "@system/lib/tiptap/core";
import { ReactNodeViewRenderer } from "@system/lib/tiptap/react";
import Kanban from "./kanban.ts";

const KanbanNode = Node.create({
  name: "kanban",

  group: "block",

  parseHTML() {
    return [
      {
        tag: "div[data-type='kanban']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "block" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Kanban);
  },
});

export default KanbanNode;
