import { invoke } from "@tauri-apps/api/core";
import { FileMetadataListSchema } from "../schemas/fileSchema";
import { resolveNodeType } from "../utils/resolveNodeType";
import { featureRegistry } from "@system/registries/featureRegitry";
import type { NodeDetail } from "../schemas/nodeSchema";

interface Payload {
  parentId: string;
  name: string;
  group: "file" | "folder" | "template";
}

export const nodeService = {
  getDetail: async <T extends NodeDetail>(fileId: string): Promise<T> => {
    try {
      const rawData = await invoke<NodeDetail>("get_file_detail", {
        fileId: fileId,
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
  getList: async () => {
    try {
      const rawFileList = await invoke("get_files");
      return FileMetadataListSchema.parse(rawFileList);
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
