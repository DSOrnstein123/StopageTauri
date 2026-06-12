import type { IconData } from "@system/schemas/iconData";
import type { NodeConfig } from "./node";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PluginRegistryMap {}

export interface Plugin extends PluginConfig {
  id: PluginId;
}
export type PluginId = keyof PluginRegistryMap;
type PluginConfigs = PluginRegistryMap[PluginId];
export interface PluginManifest extends Plugin {
  onRegister?: () => void;
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
