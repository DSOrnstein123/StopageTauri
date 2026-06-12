import type { NodeType } from "@system/registries/node";
import type { PluginId } from "@system/registries/plugin";
import type { IconData } from "@system/schemas/iconData";

export type TabMode = "dynamic" | "static";

interface BaseTabProps {
  tabId: string;
  icon?: IconData;
  mode: TabMode;
  isActive: boolean;
  setTitle: (newTitle: string) => void;
}

export interface DynamicTabProps extends BaseTabProps {
  nodeId: string;
  type?: NodeType;
  mode: "dynamic";
}

export interface StaticTabProps extends BaseTabProps {
  type: PluginId;
  mode: "static";
}

export type TabProps = DynamicTabProps | StaticTabProps;
