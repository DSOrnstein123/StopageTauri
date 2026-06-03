// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PluginRegistryMap {}
type ExtractNodeType<T> = T extends { nodes: infer N } ? keyof N : never;

export type PluginId = keyof PluginRegistryMap;
type PluginConfigs = PluginRegistryMap[PluginId];
export type NodeType = ExtractNodeType<PluginConfigs>;

export interface Plugin extends PluginConfig {
  id: string;
}

interface PluginManifest {
  name: string;
  api?: PluginApi;
  actionButtons?: ActionButton[];
}

export interface PluginConfig extends PluginManifest {
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

interface Slots {
  toolbar?: ComponentType<{ data: unknown }>;
  sidebar?: ComponentType;
  header?: ComponentType<{ data: unknown }>;
  footer?: ComponentType<{ data: unknown }>;
}
type Slot = keyof Slots;

type NodeApi = PluginApi;

interface NodeConfig {
  defaultIcon?: string;
  component: ComponentType;
  schema?: ZodType;
  actionButtons?: ActionButton[];
  api?: NodeApi;
  slots?: Slots;
}
