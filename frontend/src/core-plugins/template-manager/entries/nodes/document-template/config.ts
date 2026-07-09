import DocumentTemplateView from "./components/DocumentTemplateView";
import { DocumentTemplateDetailSchema } from "./schemas/documentTemplateSchema";
import type { NodeConfig } from "@system/registries/node";

export const documentTemplateConfig = {
  view: DocumentTemplateView,
  kind: "template",
  schema: DocumentTemplateDetailSchema,
} satisfies NodeConfig;
