import z from "zod";
import { FileSchema } from "@entities/file/schemas/fileSchema";

const DocumentFileSchema = FileSchema.extend({
  type: z.literal("document"),
  content: z
    .string()
    .nullish()
    .transform((value) => value ?? ""),
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
