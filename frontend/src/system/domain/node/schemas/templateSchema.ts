import { DocumentFileSchema } from "@features/document/schemas/documentSchema";
import z from "zod";

const TemplateFileSchema = DocumentFileSchema.extend({
  isTemplate: z.literal(true),
});
type TemplateFile = z.infer<typeof TemplateFileSchema>;

const TemplateFileListSchema = z.array(TemplateFileSchema);
type TemplateFileList = z.infer<typeof TemplateFileListSchema>;

export {
  TemplateFileSchema,
  type TemplateFile,
  TemplateFileListSchema,
  type TemplateFileList,
};
