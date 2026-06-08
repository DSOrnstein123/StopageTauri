import { Node, mergeAttributes } from "@tiptap/core";

export const Column = Node.create({
  name: "column",
  content: "block+",
  isolating: true,

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column",
        class:
          "min-w-0 border border-transparent hover:border-gray-200 border-dashed rounded p-1 transition-colors",
      }),
      0,
    ];
  },
});
