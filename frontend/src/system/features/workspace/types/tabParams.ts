import type { NodeType } from "@system/registries/node";
import type { TabMode } from "./tabProps";
import type { PluginId } from "@system/registries/plugin";

interface BaseTabParams {
  title: string;
  mode: TabMode;
}

export interface DynamicTabParams extends BaseTabParams {
  nodeId: string;
  type?: NodeType;
  mode: "dynamic";
}

export interface StaticTabParams extends BaseTabParams {
  type: PluginId;
  mode: "static";
}

export type TabParams = DynamicTabParams | StaticTabParams;

export type OpenTabParams = TabParams;
