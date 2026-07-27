import Highlight from "@tiptap/extension-highlight";

export const SemanticHighlight = Highlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      id: {
        default: null,

        parseHTML: (element) =>
          element.getAttribute("data-highlight-id"),

        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            "data-highlight-id": attributes.id,
          };
        },
      },
    };
  },
}).configure({
  multicolor: true,
});