import z from "zod";
import { UUIDSchema } from "@/shared/schemas/uuidSchema";

const RawPropertiesSchema = z.record(z.string(), z.string()).default({});
type RawProperties = z.infer<typeof RawPropertiesSchema>;

const BasePropertySchema = z.object({
  id: UUIDSchema,
  name: z.string(),
});
const PropertySchema = z.discriminatedUnion("type", [
  BasePropertySchema.extend({
    type: z.literal("text"),
    value: z.string(),
  }),
  BasePropertySchema.extend({
    type: z.literal("select"),
    options: z.array(z.string()),
    value: z.string(),
  }),
]);
type Property = z.infer<typeof PropertySchema>;

const DocumentSchema = z.object({
  id: UUIDSchema,
  collectionId: UUIDSchema,
  title: z.string(),
  content: z.string(),
  property: RawPropertiesSchema,
  createdAt: z.coerce.date().optional(),
});
type Document = z.infer<typeof DocumentSchema>;

const DocumentInCollectionSchema = DocumentSchema.extend({
  collectionId: UUIDSchema,
  property: RawPropertiesSchema,
});

const DocumentContentSchema = z.object({
  collectionId: UUIDSchema,
  content: z.string(),
  property: RawPropertiesSchema,
});
type DocumentContent = z.infer<typeof DocumentContentSchema>;

const DocumentListSchema = z.array(DocumentSchema);

export {
  DocumentSchema,
  type Document,
  DocumentContentSchema,
  type DocumentContent,
  DocumentInCollectionSchema,
  RawPropertiesSchema,
  type RawProperties,
  PropertySchema,
  type Property,
  DocumentListSchema,
};
