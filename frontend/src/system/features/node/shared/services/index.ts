import { invoke } from "@tauri-apps/api/core";
import { NodeMetadataListSchema, type NodeDetail } from "../schemas/nodeSchema";
import type { CreateNodePayload, NodeFilterOptions } from "../types";
import { pluginManager } from "@system/registries/pluginManager";
import type { NodeType } from "@system/registries/plugin";
import type { NodeDetailMap } from "@system/registries/node";

export const nodeService = {
  //TODO: redefine schema
  getDetail: async (id: string): Promise<NodeDetail> => {
    try {
      const rawData = await invoke<NodeDetail>("get_node_detail", {
        id: id,
      });
      console.log(rawData);
      const schema = pluginManager.getNodeSchema(rawData.type);
      const validData = schema.parse(rawData);
      return validData;
    } catch (error) {
      console.error("getDetail failed:", error);
      throw error;
    }
  },
  getList: async (options?: NodeFilterOptions) => {
    try {
      const rawData = await invoke("get_nodes", { options });
      console.log(rawData);
      return NodeMetadataListSchema.parse(rawData);
    } catch (error) {
      console.error("getList failed:", error);
      throw error;
    }
  },
  create: async <T extends NodeDetail>(payload: CreateNodePayload) => {
    try {
      const data = await invoke("create_node", { payload: payload });
      console.log(data);
      return data as T;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateName: (id: string, newName: string) =>
    invoke("update_node_name", { id: id, newName: newName }),
  putData: <N extends NodeType>(
    id: string,
    newData: NodeDetailMap<N>["data"],
  ) => invoke("update_node_data", { id: id, newData: newData }),
  patchData: <N extends NodeType>(
    id: string,
    newData: Partial<NodeDetailMap<N>["data"]>,
  ) => invoke("update_node_data", { id: id, newData: newData }),
};
