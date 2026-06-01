import { invoke } from "@tauri-apps/api/core";
import { resolveNodeType } from "../utils/resolveNodeType";
import { pluginRegistry } from "@system/registries/pluginRegistry";
import { NodeMetadataListSchema, type NodeDetail } from "../schemas/nodeSchema";
import type { CreateNodePayload, NodeFilterOptions } from "../types";

export const nodeService = {
  getDetail: async <T extends NodeDetail>(id: string): Promise<T> => {
    try {
      const rawData = await invoke<NodeDetail>("get_node_detail", {
        id: id,
      });
      console.log(rawData);
      const nodeType = resolveNodeType(rawData.kind, rawData.type);
      const schema = pluginRegistry.getSchema(nodeType);
      const validData = schema.parse(rawData);
      return validData as T;
    } catch (error) {
      console.error("getDetail failed:", error);
      throw error;
    }
  },
  getList: async (options?: NodeFilterOptions) => {
    try {
      const rawData = await invoke("get_nodes", { options });
      return NodeMetadataListSchema.parse(rawData);
    } catch (error) {
      console.error("getList failed:", error);
      throw error;
    }
  },
  create: async <T extends NodeDetail>(payload: CreateNodePayload) => {
    try {
      const data = await invoke("create_node", { payload: payload });
      return data as T;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateName: (id: string, newName: string) =>
    invoke("update_node_name", { id: id, newName: newName }),
  updateData: (id: string, newData: Record<string, unknown>) =>
    invoke("update_node_data", { id: id, newData: newData }),
};
