import { Document, DocumentSidebar } from "@features/document";
import { featureRegistry } from "./init";
import { DocumentFileSchema } from "@features/document/schemas/documentSchema";
import { documentService } from "@features/document/services/documentService";

featureRegistry.register("document", {
  component: Document,
  sidebarComponent: DocumentSidebar,
  parser: DocumentFileSchema.parse,
  fetcher: (id: string) => documentService.getDetail(id),
});
