import { invoke } from "@tauri-apps/api/core";
import { FileMetadataListSchema, type FileDetail } from "../schemas/fileSchema";
import { featureRegistry } from "@shared/lib/registry/featureRegitry";
import { resolveNodeType } from "@shared/lib/registry/resolveNodeType";

export const fileService = {
  getDetail: async <T extends FileDetail>(fileId: string): Promise<T> => {
    try {
      const rawData = await invoke<FileDetail>("get_file_detail", {
        fileId: fileId,
      });
      const fileType = resolveNodeType(rawData.type, rawData.isTemplate);
      console.log(rawData);
      const schema = featureRegistry.getSchema(fileType);
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
  updateName: (id: string, newName: string) =>
    invoke("update_file_name", { id: id, newName: newName }),
};
