import type { ComponentType } from "react";

interface FeatureConfig {
  component: ComponentType<{ data: unknown }>;
  sidebarComponent?: ComponentType;
  actionButton?: ComponentType;
  parser: (data: unknown) => unknown;
  fetcher: (id: string) => unknown;

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
      component: config.component,
      sidebarComponent: config.sidebarComponent,
      parser: config.parser,
      fetcher: config.fetcher,
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
    if (!this.features.has(type)) {
      return false;
    }
    return true;
  }

  getComponent(type: string) {
    if (!this.has(type)) return;
    return this.features.get(type)?.component;
  }

  getSidebarComponent(type: string) {
    if (!this.has(type)) return;
    return this.features.get(type)?.sidebarComponent;
  }

  getParser(type: string) {
    if (!this.has(type)) return;
    return this.features.get(type)?.parser;
  }

  getFetcher(type: string) {
    if (!this.has(type)) return;
    return this.features.get(type)?.fetcher;
  }
}
