import { featureRegistry } from "@shared/lib/registry/featureRegitry";
import { IconDataSchema } from "@shared/schemas/iconData";
import { SimpleUUIDSchema } from "@shared/schemas/simpleUUIDSchema";
import z from "zod";

const FileMetadataSchema = z.object({
  id: SimpleUUIDSchema,
  parentId: SimpleUUIDSchema.nullable(),
  icon: IconDataSchema,
  name: z.string(),
  type: z.string().refine((val) => featureRegistry.has(val), {
    message: "This file type is not supported",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
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
