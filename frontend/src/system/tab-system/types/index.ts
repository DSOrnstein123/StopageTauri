export interface DynamicTabConfig {
  id: string;
  icon?: string;
  name: string;
  type?: string;
  mode: "dynamic";
}

export interface StaticTabConfig {
  icon?: string;
  name: string;
  type: string;
  mode: "static";
}

export type TabConfig = DynamicTabConfig | StaticTabConfig;
