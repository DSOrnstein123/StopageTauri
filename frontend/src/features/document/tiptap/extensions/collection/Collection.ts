import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CollectionUI from "./CollectionUI";

const CollectionNode = Node.create({
  name: "collection-node",
  group: "block",
  atom: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="collection-node"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "collection-node" }),
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

      collectionId: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-collection-id") || "",
        renderHTML: (attrs) => ({ "data-collection-id": attrs.collectionId }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CollectionUI);
  },
});

export default CollectionNode;
