import type { TabMode } from "./tabConfig";

interface BaseTabParams {
  mode: TabMode;
}

export interface DynamicTabParams extends BaseTabParams {
  nodeId: string;
  type?: string;
  mode: "dynamic";
}

export interface StaticTabParams extends BaseTabParams {
  type: string;
  mode: "static";
}

export type TabParams = DynamicTabParams | StaticTabParams;
