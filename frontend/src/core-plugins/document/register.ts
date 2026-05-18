import { pluginRegistry } from "@system/registries/pluginRegistry";
import { DocumentFileSchema } from "./schemas/documentSchema";
import Document from "./components/DocumentView";
import DocumentSidebar from "./components/DocumentSidebar";
import { TemplateMetadataSchema } from "@system/domain/node/schemas/templateSchema";

pluginRegistry.register("document", {
  component: Document,
  schema: DocumentFileSchema,
  sidebarComponent: DocumentSidebar,
});

pluginRegistry.register("document:template", {
  component: Document,
  schema: TemplateMetadataSchema,
  sidebarComponent: DocumentSidebar,
});
