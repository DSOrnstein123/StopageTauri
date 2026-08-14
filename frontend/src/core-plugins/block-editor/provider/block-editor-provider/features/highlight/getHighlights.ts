import { Editor } from "@system/lib/tiptap";

export interface HighlightItem {
  id: string;
  text: string;
  color: string | null;
  from: number;
  to: number;
}

export const getHighlights = (editor: Editor): HighlightItem[] => {
  const highlights = new Map<string, HighlightItem>();

  editor.state.doc.descendants((node, position) => {
    if (!node.isText || !node.text) {
      return;
    }

    const mark = node.marks.find((mark) => mark.type.name === "highlight");

    if (!mark) {
      return;
    }

    const id = mark.attrs.id as string | null;

    if (!id) {
      return;
    }

    const existing = highlights.get(id);
    const to = position + node.nodeSize;

    if (existing) {
      existing.text += node.text;
      existing.to = to;
      return;
    }

    highlights.set(id, {
      id,
      text: node.text,
      color: mark.attrs.color ?? null,
      from: position,
      to,
    });
  });

  return Array.from(highlights.values());
};
