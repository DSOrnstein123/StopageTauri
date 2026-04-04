import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CollectionView from "./CollectionView";

const Collection = Node.create({
  name: "collection",
  group: "block",
  atom: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="collection"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "collection" }),
    ];
  },

  addAttributes() {
    return {
      schema: {
        parseHTML: (el) => JSON.parse(el.getAttribute("data-schema") || "[]"),
        renderHTML: (attrs) => ({
          "data-schema": JSON.stringify(attrs.schema),
        }),
      },

      rows: {
        default: [],
        parseHTML: (el) => JSON.parse(el.getAttribute("data-rows") || "[]"),
        renderHTML: (attrs) => ({ "data-rows": JSON.stringify(attrs.rows) }),
      },

      view: {
        default: "table",
        parseHTML: (el) => el.getAttribute("data-view") || "table",
        renderHTML: (attrs) => ({ "data-view": attrs.view }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CollectionView);
  },
});

export default Collection;
