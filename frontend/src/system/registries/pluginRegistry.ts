import type { IconData } from "@system/icon/schemas/iconData";
import type { ComponentType } from "react";
import type { ZodType } from "zod";

interface FeatureConfig {
  defaultIcon?: string;
  component: ComponentType<{ data: unknown }>;
  schema?: ZodType;
  actionButtons?: {
    id: string;
    icon: IconData;
    action: () => void;
  }[];

  slots?: {
    toolbar?: ComponentType<{ data: unknown }>;
    sidebar?: ComponentType;
    header?: ComponentType<{ data: unknown }>;
    footer?: ComponentType<{ data: unknown }>;
  };
}

type Slot = keyof NonNullable<FeatureConfig["slots"]>;

export class PluginRegistry {
  private plugins = new Map<string, FeatureConfig>();

  register(id: string, config: FeatureConfig) {
    this.plugins.set(id, {
      ...config,
    });
  }

  registerSlot(
    id: string,
    slot: Slot,
    component: ComponentType<{ data: unknown }>,
  ) {
    const existing = this.plugins.get(id);
    if (!existing) return;

    this.plugins.set(id, {
      ...existing,
      slots: {
        ...existing.slots,
        [slot]: component,
      },
    });
  }

  has(id: string): boolean {
    return this.plugins.has(id);
  }

  getComponent(id: string) {
    const feature = this.plugins.get(id);
    if (!feature || !feature.component) {
      throw new Error(
        `[PluginRegistry] Cannot find component for plugin '${id}'`,
      );
    }
    return feature.component;
  }

  getSchema(id: string) {
    const feature = this.plugins.get(id);
    if (!feature || !feature.schema) {
      throw new Error(`[PluginRegistry] Cannot find schema for plugin '${id}'`);
    }
    return feature.schema;
  }

  getActionButton(id: string) {
    const feature = this.plugins.get(id);
    if (!feature) {
      throw new Error(`[PluginRegistry] Plugin '${id}' is not registered`);
    }
    return feature.actionButtons;
  }

  getActionButtons() {
    return Array.from(this.plugins.values()).flatMap((config) => {
      if (!config.actionButtons) return [];
      return config.actionButtons.map((button) => ({
        ...button,
      }));
    });
  }

  getSlot(id: string, slot: Slot) {
    const feature = this.plugins.get(id);
    if (!feature) {
      throw new Error(`[PluginRegistry] Plugin '${id}' is not registered`);
    }
    return feature.slots?.[slot];
  }
}

export const pluginRegistry = new PluginRegistry();
