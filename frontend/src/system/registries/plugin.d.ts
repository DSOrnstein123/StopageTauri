import type { IconData } from "@system/schemas/iconData";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PluginRegistryMap {}
type ExtractNodeType<T> = T extends { nodes: infer N } ? keyof N : never;
type ExtractNodeSlot<T> = T extends { slots: infer S } ? keyof S : never;

export type PluginId = keyof PluginRegistryMap;
type PluginConfigs = PluginRegistryMap[PluginId];
export type NodeType = ExtractNodeType<PluginConfigs>;

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type NodeMap = UnionToIntersection<
  PluginRegistryMap[PluginId] extends {
    nodes: infer N;
  }
    ? N
    : never
>;

type CustomSlots<N extends NodeType> = NodeMap[N] extends {
  slots: infer S;
}
  ? S
  : Record<string, never>;

type NodeSlotMap<N extends NodeType> = DefaultSlots & CustomSlots<N>;
export type NodeSlots<N extends NodeType> = Partial<NodeSlotMap<N>>;

export interface Plugin extends PluginConfig {
  id: PluginId;
}

interface PluginConfig {
  name: string;
  component?: ComponentType;
  icon?: IconData;
  api?: PluginApi;
  actionButtons?: ActionButton[];
  nodes?: Record<string, NodeConfig>;
}

interface PluginApi {
  hooks?: Record<string, (...args: unknown[]) => unknown>;
}

interface ActionButton {
  id: string;
  icon: IconData;
  action: () => void;
}

interface DefaultSlots {
  toolbar?: ComponentType<{ data?: unknown }>;
  sidebar?: ComponentType<{ data?: unknown }>;
  header?: ComponentType<{ data?: unknown }>;
  footer?: ComponentType<{ data?: unknown }>;
}
type DefaultSlot = keyof DefaultSlots;

type NodeApi = PluginApi;

interface NodeConfig {
  defaultIcon?: string;
  component: ComponentType;
  schema?: ZodType;
  actionButtons?: ActionButton[];
  api?: NodeApi;
  slots?: Record<string, ComponentType<{ data?: unknown }>>;
}
