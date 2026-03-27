import type { DocumentParams } from "@/features/document/document.params";

export interface PanelParamsRegistry {
  document: DocumentParams;
}

export type PanelType = keyof PanelParamsRegistry;
export type PanelParams = PanelParamsRegistry[PanelType];
