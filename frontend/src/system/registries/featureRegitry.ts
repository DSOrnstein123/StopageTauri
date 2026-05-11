import type { ComponentType } from "react";
import type { ZodType } from "zod";

interface FeatureConfig {
  component: ComponentType<{ data: unknown }>;
  schema: ZodType;
  actionButton?: ComponentType;
  sidebarComponent?: ComponentType;

  slots?: {
    toolbar?: ComponentType<{ data: unknown }>;
    sidebar?: ComponentType<{ data: unknown }>;
    header?: ComponentType<{ data: unknown }>;
    footer?: ComponentType<{ data: unknown }>;
  };
}

type Slot = keyof NonNullable<FeatureConfig["slots"]>;

export class FeatureRegistry {
  private features = new Map<string, FeatureConfig>();

  register(type: string, config: FeatureConfig) {
    this.features.set(type, {
      ...config,
    });
  }

  registerSlot(
    type: string,
    slot: Slot,
    component: ComponentType<{ data: unknown }>,
  ) {
    const existing = this.features.get(type);
    if (!existing) return;

    this.features.set(type, {
      ...existing,
      slots: {
        ...existing.slots,
        [slot]: component,
      },
    });
  }

  has(type: string): boolean {
    return this.features.has(type);
  }

  getComponent(type: string) {
    const feature = this.features.get(type);
    if (!feature || !feature.component) {
      throw new Error(
        `[FeatureRegistry] Cannot find component for type '${type}'`,
      );
    }
    return feature.component;
  }

  getSchema(type: string) {
    const feature = this.features.get(type);
    if (!feature || !feature.schema) {
      throw new Error(
        `[FeatureRegistry] Cannot find schema for type '${type}'`,
      );
    }
    return feature.schema;
  }

  getSidebarComponent(type: string) {
    const feature = this.features.get(type);
    if (!feature) {
      throw new Error(
        `[FeatureRegistry] Feature type '${type}' is not registered`,
      );
    }
    return feature.sidebarComponent;
  }

  getActionButton(type: string) {
    const feature = this.features.get(type);
    if (!feature) {
      throw new Error(
        `[FeatureRegistry] Feature type '${type}' is not registered`,
      );
    }
    return feature.actionButton;
  }

  getSlot(type: string, slot: Slot) {
    const feature = this.features.get(type);
    if (!feature) {
      throw new Error(
        `[FeatureRegistry] Feature type '${type}' is not registered`,
      );
    }
    return feature.slots?.[slot];
  }
}

export const featureRegistry = new FeatureRegistry();
