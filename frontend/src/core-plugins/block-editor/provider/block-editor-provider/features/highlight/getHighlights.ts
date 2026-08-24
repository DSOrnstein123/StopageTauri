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
    if (!mark) return;

    const id = mark.attrs.id as string | null;
    if (!id) throw new Error(`Invalid highlight`);

    const highlight = highlights.get(id);
    const to = position + node.nodeSize;

    if (!highlight) {
      highlights.set(id, {
        id,
        text: node.text,
        color: mark.attrs.color ?? null,
        from: position,
        to,
      });
    } else {
      highlight.text += node.text;
      highlight.to = to;
    }
  });

  return Array.from(highlights.values());
};
