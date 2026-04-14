import z from "zod";

const DocumentSchema = z.object({
  id: z.uuidv4(),
  title: z.string(),
  createdAt: z.coerce.date(),
});

const PropertySchema = z.record(z.string(), z.string()).default({});

const DocumentInCollectionSchema = DocumentSchema.extend({
  collectionId: z.uuidv4(),
  property: PropertySchema,
});

const DocumentContentSchema = z.object({
  content: z.string(),
});

type Document = z.infer<typeof DocumentSchema>;

const DocumentListSchema = z.array(DocumentSchema);

export {
  DocumentSchema,
  DocumentContentSchema,
  DocumentInCollectionSchema,
  PropertySchema,
  DocumentListSchema,
  type Document,
};
