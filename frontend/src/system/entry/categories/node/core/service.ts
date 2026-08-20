import { invoke } from "@tauri-apps/api/core";
import {
  NodeDetailSchema,
  NodeMetadataListSchema,
  type NodeDetail,
} from "./schema";
import type { CreateNodePayload, NodeListOptions } from "./types/payload";
import type { NodeType } from "@system/plugin-manager/plugin";
import type { NodeDetailMap } from "@system/entry/categories/node/core/types";

//TODO: add zod validate
export const nodeService = {
  getDetail: async (id: string) => {
    try {
      const rawData = await invoke<NodeDetail>("get_node_detail", {
        id: id,
      });
      console.log(rawData);
      const nodeDetail = NodeDetailSchema.parse(rawData);
      // const schema = pluginManager.getNodeSchema(rawData.type);
      // const nodeData = schema.parse(nodeDetail.data);
      return {
        ...nodeDetail,
        // data: nodeData,
      };
    } catch (error) {
      console.error("getDetail failed:", error);
      throw error;
    }
  },
  getList: async (options?: NodeListOptions) => {
    try {
      const rawData = await invoke("get_nodes", { options });
      console.log(rawData);
      return NodeMetadataListSchema.parse(rawData);
    } catch (error) {
      console.error("getList failed:", error);
      throw error;
    }
  },
  getDetails: async (ids: string[]) => {
    try {
      return invoke<NodeDetail[]>("get_details_by_ids", { ids: ids });
    } catch (error) {
      console.error(error);
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
