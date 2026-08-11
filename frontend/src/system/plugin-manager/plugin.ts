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

export interface PluginConfig {
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
  type: string;
  view: ComponentType;
  defaultIcon?: IconData;
  actionButtons?: ActionButton[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createController?: (...args: any[]) => BaseController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEntryStore?: () => StoreApi<any>;
  slots?: Record<string, Slot>;
  auxiliary?: AuxiliaryConfig;
}

type ExtractPluginEntries<P> = P extends { entries: infer E } ? E : never;
export type PluginEntries = ExtractPluginEntries<PluginConfigs>;
type ExtractEntryConfigs<E, K extends EntryCategory> = UnionToIntersection<
  E extends Record<K, infer T> ? T : never
>;
type NodeConfigs = ExtractEntryConfigs<PluginEntries, "nodes">;
type ToolConfigs = ExtractEntryConfigs<PluginEntries, "tools">;
type EntryConfigs = NodeConfigs & ToolConfigs;

export type NodeType = keyof NodeConfigs;
export type ToolType = keyof ToolConfigs;
export type EntryType = NodeType | ToolType;

type NodeApi<N extends NodeType> = ReturnType<
  NonNullable<NodeConfigs[N]["createController"]>
>["api"];
type ToolApi<T extends ToolType> = ReturnType<
  NonNullable<ToolConfig[T]["createController"]>
>["api"];
export type EntryApi<E extends EntryType> = E extends NodeType
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

export interface DefaultSlots {
  toolbar?: ComponentType;
  sidebar?: ComponentType;
  header?: ComponentType;
  footer?: ComponentType;
}

export type EntryDetailConfig<E extends EntryType> = EntryConfigs[E];

export type ExtractCreateStore<E extends EntryType> =
  EntryDetailConfig<E> extends { createEntryStore: infer C } ? C : never;
type ExtractStore<E extends EntryType> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ExtractCreateStore<E> extends (...args: any[]) => infer Store ? Store : never;
export type StoreOf<T> = T extends StoreApi<infer S> ? S : never;
export type EntryStoreMap<E extends EntryType> = StoreOf<ExtractStore<E>>;
