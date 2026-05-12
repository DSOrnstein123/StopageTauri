import { Document, DocumentSidebar } from "@features/document";
import { DocumentFileSchema } from "@features/document/schemas/documentSchema";
import { TemplateFileSchema } from "@system/domain/node/schemas/templateSchema";

import { pluginRegistry } from "@system/registries/pluginRegistry";
pluginRegistry.register("document", {
  component: Document,
  schema: DocumentFileSchema,
  sidebarComponent: DocumentSidebar,
});

pluginRegistry.register("document:template", {
  component: Document,
  schema: TemplateFileSchema,
  sidebarComponent: DocumentSidebar,
});
