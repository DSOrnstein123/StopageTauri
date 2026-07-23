import z from "zod";
import { NodeKindSchema, NodeMetadataSchema } from "../../core/schema";

const FileMetadataSchema = NodeMetadataSchema.extend({
  kind: z.literal(NodeKindSchema.enum.file),
});
type FileMetadata = z.infer<typeof FileMetadataSchema>;
const FileMetadataListSchema = z.array(FileMetadataSchema);
type FileMetadataList = z.infer<typeof FileMetadataListSchema>;

const FileDetailSchema = FileMetadataSchema.extend({
  data: z.record(z.string(), z.unknown()),
  properties: z.record(z.string(), z.string()),
});
type FileDetail = z.infer<typeof FileDetailSchema>;
const FileDetailListSchema = z.array(FileDetailSchema);
type FileDetailList = z.infer<typeof FileDetailListSchema>;

export {
  FileMetadataSchema,
  type FileMetadata,
  FileMetadataListSchema,
  type FileMetadataList,
  FileDetailSchema,
  type FileDetail,
  FileDetailListSchema,
  type FileDetailList,
};
