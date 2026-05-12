import { create } from "zustand";
import { Editor } from "@tiptap/react";
import type { TableOfContentData } from "@tiptap/extension-table-of-contents";

interface IDocumentStore {
  activeEditor: Editor | null;
  tocItems: TableOfContentData | null;

  setActiveEditor: (editor: Editor) => void;
  setTOCItems: (tocItems: TableOfContentData) => void;
}

export const useDocumentStore = create<IDocumentStore>((set) => ({
  activeEditor: null,
  tocItems: null,

  setActiveEditor: (editor) => set({ activeEditor: editor }),
  setTOCItems: (tocItems) => set({ tocItems: tocItems }),
}));
