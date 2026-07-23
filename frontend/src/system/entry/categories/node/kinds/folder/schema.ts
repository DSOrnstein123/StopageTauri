import z from "zod";
import { NodeKindSchema, NodeMetadataSchema } from "../../core/schema";

const FolderMetadataSchema = NodeMetadataSchema.extend({
  kind: z.literal(NodeKindSchema.enum.folder),
});
type FolderMetadata = z.infer<typeof FolderMetadataSchema>;
const FolderMetadataListSchema = z.array(FolderMetadataSchema);
type FolderMetadataList = z.infer<typeof FolderMetadataListSchema>;

export {
  FolderMetadataSchema,
  type FolderMetadata,
  FolderMetadataListSchema,
  type FolderMetadataList,
};
