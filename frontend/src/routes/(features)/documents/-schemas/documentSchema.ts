import z from "zod";

const DocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
});

interface DocumentContent {
  content: string;
}

type Document = z.infer<typeof DocumentSchema>;

const DocumentListSchema = z.array(DocumentSchema);

export {
  DocumentSchema,
  type Document,
  DocumentListSchema,
  type DocumentContent,
};
