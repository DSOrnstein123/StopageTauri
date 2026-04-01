import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import DatabaseView from "./DatabaseView";

const Database = Node.create({
  name: "database",
  group: "block",
  atom: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="database"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "database" }),
    ];
  },

  addAttributes() {
    return {
      schema: {
        default: [
          { id: "c1", name: "Name", type: "text" },
          {
            id: "c2",
            name: "Status",
            type: "select",
            options: [
              { label: "Todo", color: "gray" },
              { label: "In progress", color: "blue" },
              { label: "Done", color: "green" },
            ],
          },
          { id: "c3", name: "Deadline", type: "date" },
          { id: "c4", name: "Done", type: "checkbox" },
        ],
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
    return ReactNodeViewRenderer(DatabaseView);
  },
});

export default Database;
