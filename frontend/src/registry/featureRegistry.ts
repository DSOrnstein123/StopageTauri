import DocumentView from "@/features/document/DocumentView";
import Calendar from "@/features/planner/components/Calendar";
import { Calendar1 } from "lucide-react";
import type { ComponentType, ElementType } from "react";

export type FeatureType = "document" | "planner";

interface FeatureDefinition {
  type: FeatureType;
  icon?: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
}

export const featureRegistry: Record<FeatureType, FeatureDefinition> = {
  document: {
    type: "document",
    component: DocumentView,
  },
  planner: {
    type: "planner",
    icon: Calendar1,
    component: Calendar,
  },
};
