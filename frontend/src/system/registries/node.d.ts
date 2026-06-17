import type { ComponentType } from "react";
import {
  type ActionButton,
  type DefaultSlots,
  type PluginApi,
  type PluginConfigs,
} from "./plugin";
import type { ZodType } from "zod";
import type { UnionToIntersection } from "@system/utils/unionToIntersection";
import type { ControllerClass } from "@system/features/workspace/types/registries/tabApi";

export interface NodeConfig {
  defaultIcon?: string;
  component: ComponentType;
  schema?: ZodType;
  actionButtons?: ActionButton[];
  api?: NodeApi;
  controller?: ControllerClass;
  slots?: Record<string, ComponentType<{ data?: unknown }>>;
}

type NodeApi = PluginApi;

export type ExtractNodeType<P> = P extends { nodes: infer N } ? keyof N : never;
export type NodeType = ExtractNodeType<PluginConfigs>;

export type ExtractNodeConfig = PluginConfigs extends { nodes: infer N }
  ? N
  : never;
export type NodeConfigMap = UnionToIntersection<ExtractNodeConfig>;
export type NodeDetailConfig<N extends NodeType> = NodeConfigMap[N];

export type CustomSlots<N extends NodeType> =
  NodeDetailConfig<N> extends { slots: infer S } ? S : never;
export type NodeSlots<N extends NodeType> = DefaultSlots & CustomSlots<N>;

type NodeControllerClass = Extract<
  NodeConfigMap[keyof NodeConfigMap],
  { controller: unknown }
>["controller"];
export type NodeControllerInstance = InstanceType<NodeControllerClass>;
export type NodeController<N extends NodeType> =
  NodeDetailConfig<N> extends {
    controller: infer C;
  }
    ? InstanceType<Extract<C, new (...args: unknown[]) => unknown>>
    : never;
