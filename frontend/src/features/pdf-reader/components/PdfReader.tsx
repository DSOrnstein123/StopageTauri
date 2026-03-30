import { createPluginRegistration } from "@embedpdf/core";
import { EmbedPDF } from "@embedpdf/core/react";
import { usePdfiumEngine } from "@embedpdf/engines/react";

import {
  Viewport,
  ViewportPluginPackage,
} from "@embedpdf/plugin-viewport/react";
import { Scroller, ScrollPluginPackage } from "@embedpdf/plugin-scroll/react";
import {
  DocumentContent,
  DocumentManagerPluginPackage,
} from "@embedpdf/plugin-document-manager/react";
import {
  RenderLayer,
  RenderPluginPackage,
} from "@embedpdf/plugin-render/react";
import {
  SelectionPluginPackage,
  SelectionLayer,
} from "@embedpdf/plugin-selection/react";
import {
  PagePointerProvider,
  InteractionManagerPluginPackage,
} from "@embedpdf/plugin-interaction-manager/react";
import {
  SearchLayer,
  SearchPluginPackage,
} from "@embedpdf/plugin-search/react";
import { ZoomPluginPackage, ZoomMode } from "@embedpdf/plugin-zoom/react";
import {
  AnnotationPluginPackage,
  AnnotationLayer,
} from "@embedpdf/plugin-annotation/react";
import Toolbar from "./Toolbar";
import LinkHandler from "./LinkHandler";

const plugins = [
  createPluginRegistration(DocumentManagerPluginPackage, {
    initialDocuments: [{ url: "/1.pdf" }],
  }),
  createPluginRegistration(ViewportPluginPackage),
  createPluginRegistration(ScrollPluginPackage),
  createPluginRegistration(RenderPluginPackage),
  createPluginRegistration(InteractionManagerPluginPackage),
  createPluginRegistration(SelectionPluginPackage),
  createPluginRegistration(SearchPluginPackage),
  createPluginRegistration(ZoomPluginPackage, {
    defaultZoomLevel: ZoomMode.FitPage,
  }),
  createPluginRegistration(AnnotationPluginPackage, {
    annotationAuthor: "Jane Doe",
  }),
];

const PdfReader = () => {
  const { engine, isLoading } = usePdfiumEngine();

  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>;
  }

  return (
    <div className="h-full w-full">
      <EmbedPDF engine={engine} plugins={plugins}>
        {({ activeDocumentId }) =>
          activeDocumentId && (
            <DocumentContent documentId={activeDocumentId}>
              {({ isLoaded }) =>
                isLoaded && (
                  <>
                    <LinkHandler documentId={activeDocumentId} />

                    <div className="flex h-full flex-col overflow-hidden border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                      <Toolbar documentId={activeDocumentId} />

                      <div
                        className="relative flex-1"
                        style={{ userSelect: "none" }}
                      >
                        <Viewport
                          documentId={activeDocumentId}
                          className="absolute inset-0 w-full"
                          style={{
                            backgroundColor: "#f1f3f5",
                          }}
                        >
                          <Scroller
                            documentId={activeDocumentId}
                            renderPage={({ width, height, pageIndex }) => (
                              <div style={{ width, height }}>
                                <PagePointerProvider
                                  documentId={activeDocumentId}
                                  pageIndex={pageIndex}
                                >
                                  <RenderLayer
                                    documentId={activeDocumentId}
                                    pageIndex={pageIndex}
                                    className="pointer-events-none"
                                  />
                                  <SearchLayer
                                    documentId={activeDocumentId}
                                    pageIndex={pageIndex}
                                    highlightColor="rgba(255, 235, 59, 0.5)"
                                    activeHighlightColor="rgba(255, 152, 0, 0.7)"
                                  />
                                  <SelectionLayer
                                    documentId={activeDocumentId}
                                    pageIndex={pageIndex}
                                  />
                                  <AnnotationLayer
                                    documentId={activeDocumentId}
                                    pageIndex={pageIndex}
                                    selectionOutlineColor="transparent"
                                  />
                                </PagePointerProvider>
                              </div>
                            )}
                          />
                        </Viewport>
                      </div>
                    </div>
                  </>
                )
              }
            </DocumentContent>
          )
        }
      </EmbedPDF>
    </div>
  );
};

export default PdfReader;
