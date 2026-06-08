import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ColumnContainerView from "./ColumnContainerView";

export const ColumnContainer = Node.create({
  name: "column-container",
  group: "block",
  content: "column{2,}",

  addAttributes() {
    return {
      layout: {
        default: [50, 50],
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="column-container"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "column-container" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnContainerView);
  },
});
