import z from "zod";
import { SimpleUUIDSchema } from "@shared/schemas/simpleUUIDSchema";
import { FileSchema } from "@entities/file/schemas/fileSchema";
import { PropertyListSchema, RawPropertiesSchema } from "./propertySchema";

const BaseDocumentFileSchema = FileSchema.extend({
  type: z.literal("document"),
  collectionId: SimpleUUIDSchema.nullable(),
  content: z
    .string()
    .nullish()
    .transform((value) => value ?? ""),
});

const RawDocumentFileSchema = BaseDocumentFileSchema.extend({
  property: RawPropertiesSchema,
});
type RawDocumentFile = z.infer<typeof RawDocumentFileSchema>;

const DocumentFileSchema = BaseDocumentFileSchema.extend({
  property: PropertyListSchema,
});
type DocumentFile = z.infer<typeof DocumentFileSchema>;

const DocumentFileListSchema = z.array(DocumentFileSchema);
type DocumentFileList = z.infer<typeof DocumentFileListSchema>;

export {
  RawDocumentFileSchema,
  type RawDocumentFile,
  DocumentFileSchema,
  type DocumentFile,
  DocumentFileListSchema,
  type DocumentFileList,
};
