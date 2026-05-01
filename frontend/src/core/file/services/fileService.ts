import { invoke } from "@tauri-apps/api/core";
import { FileListSchema } from "../schemas/fileSchema";
import { fileValidation } from "../schemas/fileValidation";

export const fileService = {
  getDetail: async (fileId: string) => {
    try {
      const rawData = await invoke("get_file_detail", { fileId: fileId });
      const fileType = (rawData as { type: string })
        ?.type as keyof typeof fileValidation;
      console.log(rawData);
      const validData = fileValidation[fileType](rawData);
      return validData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getList: async () => {
    try {
      const rawFileList = await invoke("get_files");
      return FileListSchema.parse(rawFileList);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
