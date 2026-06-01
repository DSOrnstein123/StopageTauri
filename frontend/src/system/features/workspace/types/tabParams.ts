import type { TabMode } from "./tabProps";

interface BaseTabParams {
  title: string;
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

export type OpenTabParams = TabParams;
