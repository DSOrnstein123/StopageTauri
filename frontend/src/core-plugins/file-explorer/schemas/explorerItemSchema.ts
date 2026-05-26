import { FileMetadataSchema } from "@system/features/node/schemas/fileSchema";
import { FolderMetadataSchema } from "@system/features/node/schemas/folderSchema";
import z from "zod";

const ExplorerItemSchema = z.discriminatedUnion("kind", [
  FileMetadataSchema,
  FolderMetadataSchema,
]);
type ExplorerItem = z.infer<typeof ExplorerItemSchema>;

const ExplorerItemListSchema = z.array(ExplorerItemSchema);
type ExplorerItemList = z.infer<typeof ExplorerItemListSchema>;

export {
  ExplorerItemSchema,
  type ExplorerItem,
  ExplorerItemListSchema,
  type ExplorerItemList,
};
