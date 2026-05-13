import { invoke } from "@tauri-apps/api/core";
import { resolveNodeType } from "../utils/resolveNodeType";
import { pluginRegistry } from "@system/registries/pluginRegistry";
import {
  NodeMetadataSchema,
  type NodeDetail,
  type NodeMetadataList,
} from "../schemas/nodeSchema";
import type { NodeFilterOptions, NodeKind } from "../types/node";

interface Payload {
  parentId: string;
  name: string;
  kind: NodeKind;
}

export const nodeService = {
  getDetail: async <T extends NodeDetail>(id: string): Promise<T> => {
    const rawData = await invoke<NodeDetail>("get_node_detail", {
      fileId: id,
    });
    const nodeType = resolveNodeType(rawData.type, rawData.isTemplate);
    console.log(rawData);
    const schema = pluginRegistry.getSchema(nodeType);
    const validData = schema.parse(rawData);
    return validData as T;
  },
  getList: async (option?: NodeFilterOptions) => {
    try {
      const rawData = await invoke<NodeMetadataList>("get_nodes", {
        option: option,
      });
      return rawData.reduce((validItems: unknown[], item) => {
        const schema = pluginRegistry.getSchema(item.type);

        try {
          if (schema) {
            validItems.push(schema.parse(item));
          } else {
            const fallbackItem = NodeMetadataSchema.parse(item);
            validItems.push({ ...fallbackItem, isUnsupported: true });
          }
        } catch (error) {
          console.error(
            `[Data Error] Failed to parse node (ID: ${item.id}):`,
            error,
          );
        }

        return validItems;
      }, []);
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
