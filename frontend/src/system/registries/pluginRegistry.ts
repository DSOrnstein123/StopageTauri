import type { IconData } from "@system/icon/schemas/iconData";
import type { ComponentType } from "react";
import type { ZodType } from "zod";

interface FeatureConfig {
  defaultIcon?: string;
  component: ComponentType<{ data: unknown }>;
  schema: ZodType;
  actionButton?: {
    icon: IconData;
    action: () => void;
  };

  slots?: {
    toolbar?: ComponentType<{ data: unknown }>;
    sidebar?: ComponentType<{ data: unknown }>;
    header?: ComponentType<{ data: unknown }>;
    footer?: ComponentType<{ data: unknown }>;
  };
}

type Slot = keyof NonNullable<FeatureConfig["slots"]>;

export class PluginRegistry {
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
        `[PluginRegistry] Cannot find component for type '${type}'`,
      );
    }
    return feature.component;
  }

  getSchema(type: string) {
    const feature = this.features.get(type);
    if (!feature || !feature.schema) {
      throw new Error(`[PluginRegistry] Cannot find schema for type '${type}'`);
    }
    return feature.schema;
  }

  getActionButton(type: string) {
    const feature = this.features.get(type);
    if (!feature) {
      throw new Error(
        `[PluginRegistry] Feature type '${type}' is not registered`,
      );
    }
    return feature.actionButton;
  }

  getSlot(type: string, slot: Slot) {
    const feature = this.features.get(type);
    if (!feature) {
      throw new Error(
        `[PluginRegistry] Feature type '${type}' is not registered`,
      );
    }
    return feature.slots?.[slot];
  }
}

export const pluginRegistry = new PluginRegistry();
