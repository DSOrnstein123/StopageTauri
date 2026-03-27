import { PdfActionType, type PdfLinkAnnoObject } from "@embedpdf/models";
import { isLink, useAnnotation } from "@embedpdf/plugin-annotation/react";
import { useScroll } from "@embedpdf/plugin-scroll/react";
import { useEffect } from "react";

const LinkHandler = ({ documentId }: { documentId: string }) => {
  const { provides: annotationApi, state } = useAnnotation(documentId);
  const { provides: scrollApi } = useScroll(documentId);

  useEffect(() => {
    if (!annotationApi || !scrollApi || state?.selectedUids.length !== 1)
      return;

    const selectedList = annotationApi.getSelectedAnnotations();
    const selected = selectedList[0];

    let linkAnnotation: PdfLinkAnnoObject | null = null;

    if (isLink(selected)) {
      linkAnnotation = selected.object as PdfLinkAnnoObject;
    } else {
      const attachedLinks = annotationApi.getAttachedLinks(selected.object.id);
      if (attachedLinks.length > 0) {
        linkAnnotation = attachedLinks[0].object as PdfLinkAnnoObject;
      }
    }

    if (!linkAnnotation?.target) return;

    const target = linkAnnotation.target;

    if (target.type === "action") {
      const action = target.action;
      if (action.type === PdfActionType.URI) {
        window.open(action.uri, "_blank", "noopener,noreferrer");
      } else if (action.type === PdfActionType.Goto && scrollApi) {
        const destination = action.destination;
        scrollApi.scrollToPage({
          pageNumber: destination.pageIndex + 1,
          behavior: "smooth",
        });
      }
    } else if (target.type === "destination" && scrollApi) {
      const destination = target.destination;
      scrollApi.scrollToPage({
        pageNumber: destination.pageIndex + 1,
        behavior: "smooth",
      });
    }

    annotationApi.deselectAnnotation();
  }, [state?.selectedUids, scrollApi, annotationApi]);

  return null;
};

export default LinkHandler;
