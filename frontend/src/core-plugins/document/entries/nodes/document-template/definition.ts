import DocumentTemplateView from "./components/DocumentTemplateView";
import { DocumentTemplateDetailSchema } from "./schemas/documentTemplateSchema";
import type { NodeConfig } from "@system/registries/node";
import { createDocumentTemplateController } from "./controller";

export const TYPE = "document-template" as const;
export type TYPE = typeof TYPE;

export const config = {
  view: DocumentTemplateView,
  kind: "template",
  schema: DocumentTemplateDetailSchema,
  //TODO: fix later maybe use default controller
  createController: createDocumentTemplateController,
} satisfies NodeConfig;
