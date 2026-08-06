import type {
  EntryType,
  NodeType,
  ToolType,
} from "@system/plugin-manager/plugin";
import type { WorkbenchZone } from "@system/workbench/core/types/workbenchZone";

interface BaseOpenTabParams {
  zone: WorkbenchZone;
  title?: string;
}

export interface OpenAuxiliaryTabParams extends BaseOpenTabParams {
  entryType: EntryType;
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

export type OpenEntryTabParams = OpenNodeTabParams | OpenToolTabParams;

export type OpenTabParams =
  | (OpenAuxiliaryTabParams & {
      kind: "auxiliary";
    })
  | (OpenEntryTabParams & {
      kind: "entry";
    });
