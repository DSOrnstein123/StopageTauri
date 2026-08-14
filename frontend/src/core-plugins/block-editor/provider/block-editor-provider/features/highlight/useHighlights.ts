import { Editor } from "@system/lib/tiptap";
import { useEffect, useState } from "react";
import { getHighlights, type HighlightItem } from "./getHighlights";

const useHightlights = (editor: Editor | null) => {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);

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
