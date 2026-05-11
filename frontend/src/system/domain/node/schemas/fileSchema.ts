import z from "zod";
import { NodeMetadataSchema } from "./nodeSchema";

const FileMetadataSchema = NodeMetadataSchema.extend({
  isTemplate: z.literal(false),
});
type FileMetadata = z.infer<typeof FileMetadataSchema>;
const FileMetadataListSchema = z.array(FileMetadataSchema);
type FileMetadataList = z.infer<typeof FileMetadataListSchema>;

const FileDetailSchema = FileMetadataSchema.extend({
  content: z.record(z.string(), z.string()),
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
