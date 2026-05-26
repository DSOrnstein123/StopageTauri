export type TabMode = "dynamic" | "static";

interface BaseTabConfig {
  icon?: string;
  name: string;
  mode: TabMode;
}

export interface DynamicTabConfig extends BaseTabConfig {
  id: string;
  type?: string;
  mode: "dynamic";
}

export interface StaticTabConfig extends BaseTabConfig {
  type: string;
  mode: "static";
}

export type TabConfig = DynamicTabConfig | StaticTabConfig;
