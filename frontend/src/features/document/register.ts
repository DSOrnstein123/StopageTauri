import { Document, DocumentSidebar } from "@features/document";
import { DocumentFileSchema } from "@features/document/schemas/documentSchema";
import { TemplateFileSchema } from "@system/domain/node/schemas/templateSchema";

import { featureRegistry } from "@system/registries/featureRegitry";
featureRegistry.register("document", {
  component: Document,
  schema: DocumentFileSchema,
  sidebarComponent: DocumentSidebar,
});

featureRegistry.register("document:template", {
  component: Document,
  schema: TemplateFileSchema,
  sidebarComponent: DocumentSidebar,
});
