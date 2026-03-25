import type { DocumentParams } from "@/routes/(features)/document/document.params";

export interface PanelParamsRegistry {
  document: DocumentParams;
}

export type PanelType = keyof PanelParamsRegistry;
