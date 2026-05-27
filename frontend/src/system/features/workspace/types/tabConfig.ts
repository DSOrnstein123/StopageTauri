export type TabMode = "dynamic" | "static";

interface BaseTabConfig {
  icon?: string;
  title?: string;
  mode: TabMode;
  isActive: boolean;
  setTitle: (newTitle: string) => void;
}

export interface DynamicTabConfig extends BaseTabConfig {
  nodeId: string;
  type?: string;
  mode: "dynamic";
}

export interface StaticTabConfig extends BaseTabConfig {
  type: string;
  mode: "static";
}

export type TabConfig = DynamicTabConfig | StaticTabConfig;
