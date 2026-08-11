import type { NodeType, ToolType } from "@system/plugin-manager/plugin";
import { pluginManager } from "@system/plugin-manager/pluginManager";
import type { NodeControllerContext } from "../categories/node/core/types/controllerContext";
import type { ToolControllerContext } from "../categories/tool/controllerContext";

type EntryCreateParams = NodeCreateParams | ToolCreateParams;

interface NodeCreateParams {
  category: "node";
  type: NodeType;
  context: NodeControllerContext;
}

interface ToolCreateParams {
  category: "tool";
  type: ToolType;
  context: ToolControllerContext;
}

export const entryFactory = {
  create(params: EntryCreateParams) {
    switch (params.category) {
      case "node":
        return this.createNode(params);

      case "tool":
        return this.createTool(params);
    }
  },

  createNode(params: NodeCreateParams) {
    const nodeConfig = pluginManager.getEntryConfig(params.type);

    return {
      store: nodeConfig.createEntryStore?.(),
      controller: nodeConfig.createController?.(params.context),
    };
  },

  createTool(params: ToolCreateParams) {
    const toolConfig = pluginManager.getEntryConfig(params.type);

    return {
      store: toolConfig.createEntryStore?.(),
      controller: toolConfig.createController?.(),
    };
  },
} as const;

export type EntryFactory = typeof entryFactory;
