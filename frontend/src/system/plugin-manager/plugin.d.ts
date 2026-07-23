import type { IconData } from "@system/shared/schemas/iconData";
import type { NodeConfig } from "../entry/categories/node/core/types";
import type { ToolConfig } from "./tool";
import type { ComponentType } from "react";
import type { BaseController } from "@system/workbench/tab/classes/baseController";
import type { StoreApi } from "zustand";
import type { UnionToIntersection } from "@system/shared/utils/unionToIntersection";
import type { AuxiliaryConfig } from "@system/entry/auxiliary/auxiliary";

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

export type EntryCategory = "node" | "tool";

interface PluginConfig {
  name: string;
  icon?: IconData;
  api?: PluginApi;
  actionButtons?: ActionButton[];
  entries?: {
    nodes?: Record<string, NodeConfig>;
    tools?: Record<string, ToolConfig>;
  };
  dependencies?: PluginId[];
}

interface PluginApi {
  hooks?: Record<string, (...args: unknown[]) => unknown>;
}

export interface BaseEntryConfig {
  view: ComponentType;
  defaultIcon?: IconData;
  actionButtons?: ActionButton[];
  createController?: () => BaseController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEntryStore?: () => StoreApi<any>;
  slots?: Record<string, Slot>;
  auxiliary?: Record<string, AuxiliaryConfig>;
}

type ExtractPluginEntries<P> = P extends { entries: infer E } ? E : never;
type PluginEntries = ExtractPluginEntries<PluginConfigs>;
type ExtractEntryConfigs<E, K extends EntryCategory> = UnionToIntersection<
  E extends Record<K, infer T> ? T : never
>;
type NodeConfigs = ExtractEntryConfigs<PluginEntries, "nodes">;
type ToolConfigs = ExtractEntryConfigs<PluginEntries, "tools">;
type EntryConfigs = NodeConfigs & ToolConfigs;

type NodeType = keyof NodeConfigs;
type ToolType = keyof ToolConfigs;
type EntryType = NodeType | ToolType;

type NodeApi<N extends NodeType> = ReturnType<
  NonNullable<NodeConfigs[N]["createController"]>
>["api"];
type ToolApi<T extends ToolType> = ReturnType<
  NonNullable<ToolConfig[T]["createController"]>
>["api"];
type EntryApi<E extends EntryType> = E extends NodeType
  ? NodeApi<E>
  : E extends ToolType
    ? ToolApi<E>
    : never;

interface ActionButton {
  id: string;
  icon: IconData;
  action: () => void;
}

interface Slot {
  order?: number;
}

interface DefaultSlots {
  toolbar?: ComponentType;
  sidebar?: ComponentType;
  header?: ComponentType;
  footer?: ComponentType;
}
