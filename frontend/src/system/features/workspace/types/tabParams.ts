import type { NodeType } from "@system/registries/node";
import type { TabMode } from "./tabProps";
import type { PluginId } from "@system/registries/plugin";

interface BaseTabParams {
  title: string;
  mode: TabMode;
}

export interface DynamicTabParams extends BaseTabParams {
  mode: "dynamic";
  nodeId: string;
  type?: NodeType;
}

export interface StaticTabParams extends BaseTabParams {
  mode: "static";
  type: PluginId;
}

export type TabParams = DynamicTabParams | StaticTabParams;

export type OpenTabParams = TabParams;
