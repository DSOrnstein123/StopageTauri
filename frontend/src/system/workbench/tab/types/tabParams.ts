import type {
  EntryCategory,
  NodeType,
  ToolType,
} from "@system/plugin-manager/plugin";

interface BaseOpenTabParams {
  title?: string;
  entryCategory: EntryCategory;
}

export interface OpenNodeTabParams extends BaseOpenTabParams {
  entryCategory: "node";
  nodeId: string;
  nodeType?: NodeType;
}

export interface OpenToolTabParams extends BaseOpenTabParams {
  entryCategory: "tool";
  toolType: ToolType;
}

export type OpenTabParams = OpenNodeTabParams | OpenToolTabParams;
