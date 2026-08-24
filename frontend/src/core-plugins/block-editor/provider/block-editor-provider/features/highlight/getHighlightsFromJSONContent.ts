import { type JSONContent } from "@tiptap/react";

export interface HighlightContentItem {
  id: string;
  text: string;
  color: string | null;
}

export const getHighlightsFromJSONContent = (content: JSONContent) => {
  const highlights = new Map<string, HighlightContentItem>();

  const traverse = (node: JSONContent) => {
    if (node.type === "text" && node.text && node.marks) {
      const mark = node.marks.find((mark) => mark.type === "highlight");
      if (!mark) return;

      if (!mark.attrs) throw new Error(`Invalid highlight`);

      const id = mark.attrs.id;
      if (typeof id !== "string") throw new Error(`Invalid highlight`);

      const highlight = highlights.get(id);
      if (!highlight) {
        highlights.set(id, {
          id: id,
          text: node.text,
          color: mark.attrs.color ?? null,
        });
      } else {
        highlight.text += node.text;
      }
    }

    node.content?.forEach((child) => traverse(child));
  };

  traverse(content);

  return Array.from(highlights.values());
};
