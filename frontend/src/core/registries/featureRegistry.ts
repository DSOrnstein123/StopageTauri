import type { ComponentType } from "react";

interface FeatureConfig {
  component: ComponentType<{ data: unknown }>;
  sidebarComponent?: ComponentType;
  actionButton?: ComponentType;
  parser: (data: unknown) => unknown;
  fetcher: (id: string) => unknown;
}

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

  has(type: string): boolean {
    return this.features.has(type);
  }

  getComponent(type: string) {
    return this.has(type)
      ? this.features.get(type)?.component
      : console.error("Type is not defined");
  }

  getSidebarComponent(type: string) {
    return this.has(type)
      ? this.features.get(type)?.sidebarComponent
      : console.error("Type is not defined");
  }

  getParser(type: string) {
    return this.has(type)
      ? this.features.get(type)?.parser
      : console.error("Type is not defined");
  }

  getFetcher(type: string) {
    return this.has(type)
      ? this.features.get(type)?.fetcher
      : console.error("Type is not defined");
  }
}
