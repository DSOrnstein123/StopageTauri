import { FileDetailSchema } from "@entities/file/schemas/fileSchema";
import z from "zod";

const DocumentFileSchema = FileDetailSchema.extend({
  type: z.literal("document"),
  content: z.record(z.string(), z.unknown()),
});
type DocumentFile = z.infer<typeof DocumentFileSchema>;

const DocumentFileListSchema = z.array(DocumentFileSchema);
type DocumentFileList = z.infer<typeof DocumentFileListSchema>;

// const RawDocumentFileSchema = BaseDocumentFileSchema.extend({
//   property: RawPropertiesSchema,
// });
// type RawDocumentFile = z.infer<typeof RawDocumentFileSchema>;

// const DocumentFileSchema = BaseDocumentFileSchema.extend({
//   property: PropertyListSchema,
// });

export {
  DocumentFileSchema,
  type DocumentFile,
  DocumentFileListSchema,
  type DocumentFileList,
};
