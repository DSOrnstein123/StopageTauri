import {
  type BaseEntryConfig,
  type DefaultSlots,
  type NodeType,
  type PluginApi,
  type PluginEntries,
} from "./plugin";
import type { z, ZodType } from "zod";
import type { UnionToIntersection } from "@system/shared/utils/unionToIntersection";
import type { NodeDetail } from "@system/features/node/shared/schemas";

export type NodeKind = "folder" | "file" | "template";

export interface NodeConfig extends BaseEntryConfig {
  kind?: NodeKind;
  schema?: ZodType;
  namePlaceholder?: string;
}
//TODO: use registered type
export interface RegisteredNodeConfig extends NodeConfig {
  namePlaceholder: string;
}

type NodeApi = PluginApi & {
  controller: Record<string, (...args: unknown[]) => unknown>;
};

export type PluginEntriesUnion = UnionToIntersection<PluginEntries>;
export type NodeConfigMap = PluginEntriesUnion extends { nodes: infer N }
  ? N
  : never;
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

export type NodeDataMap<N extends NodeType> = z.infer<
  NodeDetailConfig<N>["schema"]
>;

export interface NodeDetailMap<N extends NodeType> extends NodeDetail {
  type: N;
  data: NodeDataMap<N>;
}

export type NodeNamePlaceholder<N extends NodeType> =
  NodeDetailConfig<N> extends { namePlaceholder: infer P } ? P : "Untitled";
