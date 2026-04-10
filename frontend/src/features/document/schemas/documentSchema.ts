import z from "zod";

const DocumentSchema = z.object({
  id: z.string(),
  collectionId: z.string().optional(),
  title: z.string(),
  property: z.object().optional(),
  createdAt: z.string(),
});

interface DocumentContentType {
  content: string;
}

type Document = z.infer<typeof DocumentSchema>;

const DocumentListSchema = z.array(DocumentSchema);

export {
  DocumentSchema,
  type Document,
  DocumentListSchema,
  type DocumentContentType,
};
