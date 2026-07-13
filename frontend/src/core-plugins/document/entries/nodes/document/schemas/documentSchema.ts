import z from "zod";
import { TYPE } from "../constants";
import { FileDetailSchema } from "@system/features/node/file/schemas";

const DocumentFileSchema = FileDetailSchema.extend({
  type: z.literal(TYPE),
  data: z.record(z.string(), z.unknown()),
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
