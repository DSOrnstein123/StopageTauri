import type { ComponentType } from "react";
import type { FeatureType } from "./featureRegistry";
import DocumentSidebar from "@/features/document/DocumentSidebar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SidebarType = Partial<Record<FeatureType, ComponentType<any>>> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  none: ComponentType<any>;
};

export const sidebarRegistry: SidebarType = {
  document: DocumentSidebar,
  none: () => null,
};
