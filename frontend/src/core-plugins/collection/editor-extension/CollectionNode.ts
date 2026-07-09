import { mergeAttributes, Node } from "@system/lib/tiptap/core";
import { ReactNodeViewRenderer } from "@system/lib/tiptap/react";
import CollectionView from "./CollectionView";

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
    return ReactNodeViewRenderer(CollectionView);
  },
});

export default CollectionNode;
