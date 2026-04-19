import { invoke } from "@tauri-apps/api/core";
import type { File } from "../schemas/fileSchema";

export const fileService = {
  getList: async () => {
    const fileList = await invoke<File[]>("get_files");
    return fileList;
  },
};
