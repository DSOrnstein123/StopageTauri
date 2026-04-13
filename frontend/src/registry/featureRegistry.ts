import Canvas from "@/features/canvas/Canvas";
import DocumentView from "@/features/document/DocumentView";
import Calendar from "@/features/planner/components/Calendar";
import { Calendar1 } from "lucide-react";
import type { ComponentType, ElementType } from "react";

interface FeatureDefinition {
  type: string;
  icon?: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
}

export const featureRegistry = {
  document: {
    type: "document",
    component: DocumentView,
  },
  planner: {
    type: "planner",
    icon: Calendar1,
    component: Calendar,
  },
  canvas: {
    type: "canvas",
    component: Canvas,
  },
} as const satisfies Record<string, FeatureDefinition>;

export type FeatureType = keyof typeof featureRegistry;
