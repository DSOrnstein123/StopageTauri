import type { DocumentParams } from "@/features/document/document.params";
import { featureRegistry, type FeatureType } from "@/registry/featureRegistry";

export const dockviewAdapterComponents = Object.fromEntries(
  Object.entries(featureRegistry).map(([key, feature]) => [
    key,
    feature.component,
  ]),
);

export interface PanelParamsRegistry {
  document: DocumentParams;
  planner: undefined;
  canvas: undefined;
}

export type PanelParams = PanelParamsRegistry[FeatureType];
