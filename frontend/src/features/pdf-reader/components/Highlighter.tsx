import {
  useSelectionCapability,
  type SelectionRangeX,
} from "@embedpdf/plugin-selection/react";
import { useEffect, useState } from "react";
import { ignore, PdfAnnotationSubtype } from "@embedpdf/models";
import { useAnnotation } from "@embedpdf/plugin-annotation/react";
import useHighlightStore from "../stores/highlightStore";

const Highlighter = ({ documentId }: { documentId: string }) => {
  const { provides: selectionCapability } = useSelectionCapability();
  const { provides: annotationApi } = useAnnotation(documentId);
  const [hasSelection, setHasSelection] = useState(false);
  const setText = useHighlightStore((state) => state.setText);

  useEffect(() => {
    if (!selectionCapability) return;
    const selection = selectionCapability.forDocument(documentId);
    const unscribe = selection.onSelectionChange(
      (sel: SelectionRangeX | null) => {
        setHasSelection(!!sel);
      },
    );

    return unscribe;
  }, [selectionCapability, documentId]);
  console.log(1);

  return (
    <button
      className="h-10 w-20 rounded bg-yellow-400 px-2 font-bold"
      disabled={!hasSelection}
      onClick={() => {
        if (!selectionCapability || !annotationApi) return;

        const selectionScope = selectionCapability.forDocument(documentId);
        const selections = selectionScope.getFormattedSelection();
        if (!selections || selections.length === 0) return;

        const filteredSelections = selections.map((selection, index) => {
          if (index == 0) return selection;
          selection.segmentRects.splice(0, 1);
          return selection;
        });

        filteredSelections.forEach((sel) => {
          annotationApi.createAnnotation(sel.pageIndex, {
            id: crypto.randomUUID(),
            type: PdfAnnotationSubtype.HIGHLIGHT,
            pageIndex: sel.pageIndex,
            segmentRects: sel.segmentRects,
            rect: sel.rect,
            strokeColor: "#FFFF00",
            opacity: 0.5,
          });
        });

        selectionScope.getSelectedText().wait((selectedText) => {
          const text = selectedText
            .flatMap((chunk) => chunk.split(/\r?\n/))
            .filter((line) => {
              const text = line.trim();
              if (!text) return false;

              if (
                /https?:\/\//i.test(text) ||
                /www\./i.test(text) ||
                text.includes(".vn")
              ) {
                return false;
              }
              if (/^\d+$/.test(text)) return false;
              if (text.includes("thuviensach")) return false;

              return true;
            })
            .join(" ");
          setText(text);
        }, ignore);

        selectionScope.clear();
      }}
    >
      Highlight
    </button>
  );
};

export default Highlighter;
