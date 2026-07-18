import DocumentTemplateView from "./components/DocumentTemplateView";
import type { NodeConfig } from "@system/registries/node";
import { createDocumentTemplateController } from "./controller";
import { DataSchema } from "./schemas";

export const config = {
  view: DocumentTemplateView,
  kind: "template",
  schema: DataSchema,
  //TODO: fix later maybe use default controller
  createController: createDocumentTemplateController,
} satisfies NodeConfig;
