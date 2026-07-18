import z from "zod";

const DataSchema = z.record(z.string(), z.unknown());
type DocumentFile = z.infer<typeof DataSchema>;

// const RawDocumentFileSchema = BaseDocumentFileSchema.extend({
//   property: RawPropertiesSchema,
// });
// type RawDocumentFile = z.infer<typeof RawDocumentFileSchema>;

// const DocumentFileSchema = BaseDocumentFileSchema.extend({
//   property: PropertyListSchema,
// });

export { DataSchema, type DocumentFile };
