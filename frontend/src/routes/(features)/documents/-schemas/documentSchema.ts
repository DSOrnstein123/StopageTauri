import z from "zod";

const DocumentSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  createdAt: z.string(),
});

type Document = z.infer<typeof DocumentSchema>;

const DocumentListSchema = z.array(DocumentSchema);

export { DocumentSchema, type Document, DocumentListSchema };
