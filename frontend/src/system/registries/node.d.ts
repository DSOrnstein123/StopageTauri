import type { ComponentType } from "react";
import {
  type ActionButton,
  type DefaultSlots,
  type PluginApi,
  type PluginConfigs,
} from "./plugin";
import type { ZodType } from "zod";
import type { UnionToIntersection } from "@system/utils/unionToIntersection";

export interface NodeConfig {
  defaultIcon?: string;
  component: ComponentType;
  schema?: ZodType;
  actionButtons?: ActionButton[];
  api?: NodeApi;
  slots?: Record<string, ComponentType<{ data?: unknown }>>;
}

type NodeApi = PluginApi;

export type ExtractNodeType<P> = P extends { nodes: infer N } ? keyof N : never;
export type NodeType = ExtractNodeType<PluginConfigs>;

export type ExtractNodeConfig<P> = P extends { nodes: infer N } ? N : never;
export type NodeConfigMap = UnionToIntersection<
  ExtractNodeConfig<PluginConfigs>
>;
export type NodeDetailConfig<N extends NodeType> = NodeConfigMap[N];

export type CustomSlots<N extends NodeType> =
  NodeDetailConfig<N> extends { slots: infer S } ? S : never;
export type NodeSlots<N extends NodeType> = DefaultSlots & CustomSlots<N>;
