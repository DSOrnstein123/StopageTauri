import { Document, DocumentSidebar } from "@features/document";
import { DocumentFileSchema } from "@features/document/schemas/documentSchema";
import { featureRegistry } from "@shared/lib/registry/featureRegitry";
import { TemplateFileSchema } from "../template-manager/schemas/templateSchema";

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
