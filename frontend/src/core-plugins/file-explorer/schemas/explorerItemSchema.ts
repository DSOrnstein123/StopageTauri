import { FileMetadataSchema } from "@system/entry/categories/node/kinds/file/schema";
import { FolderMetadataSchema } from "@system/entry/categories/node/kinds/folder/schema";
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
