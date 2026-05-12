import { invoke } from "@tauri-apps/api/core";
import { resolveNodeType } from "../utils/resolveNodeType";
import { featureRegistry } from "@system/registries/featureRegitry";
import {
  NodeMetadataListSchema,
  type NodeDetail,
  type NodeGroup,
} from "../schemas/nodeSchema";

interface Payload {
  parentId: string;
  name: string;
  group: NodeGroup;
}

interface GetListOption {
  includeTypes?: NodeGroup | NodeGroup[];
  excludeTypes?: NodeGroup | NodeGroup[];
}

export const nodeService = {
  getDetail: async <T extends NodeDetail>(id: string): Promise<T> => {
    try {
      const rawData = await invoke<NodeDetail>("get_node_detail", {
        fileId: id,
      });
      const nodeType = resolveNodeType(rawData.type, rawData.isTemplate);
      console.log(rawData);
      const schema = featureRegistry.getSchema(nodeType);
      const validData = schema.parse(rawData);
      return validData as T;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getList: async (option?: GetListOption) => {
    try {
      const rawFileList = await invoke("get_nodes", { option: option });
      return NodeMetadataListSchema.parse(rawFileList);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (payload: Payload) => {
    try {
      const data = await invoke("create_node", { payload: payload });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateName: (id: string, newName: string) =>
    invoke("update_file_name", { id: id, newName: newName }),
};
