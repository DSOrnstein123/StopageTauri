import { Editor } from "@system/lib/tiptap";
import { useEffect } from "react";
import { getHighlights } from "./getHighlights";
import type { EditorStore } from "../../store";
import type { StoreApi } from "zustand";
import { useStore } from "../../hooks/useStore";

const useHightlights = (
  store: StoreApi<EditorStore>,
  editor: Editor | null,
) => {
  const highlights = useStore(store, (state) => state.highlights);
  const setHighlights = useStore(store, (state) => state.setHighlights);

  useEffect(() => {
    if (!editor) return;

    const syncHighlights = () => {
      setHighlights(getHighlights(editor));
    };

    syncHighlights();

    editor.on("update", syncHighlights);

    return () => {
      editor.off("update", syncHighlights);
    };
  }, [editor, setHighlights]);

  return highlights;
};

export default useHightlights;
