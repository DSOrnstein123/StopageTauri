import Link from "@tiptap/extension-link";

const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      "data-type": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => {
          if (!attributes["data-type"]) return {};
          return { "data-type": attributes["data-type"] };
        },
      },
      "data-document-id": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-document-id"),
        renderHTML: (attributes) => {
          if (!attributes["data-document-id"]) return {};
          return { "data-document-id": attributes["data-document-id"] };
        },
      },
    };
  },
});

export default CustomLink;
