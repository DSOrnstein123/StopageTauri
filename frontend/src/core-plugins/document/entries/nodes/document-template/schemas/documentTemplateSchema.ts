import { TemplateDetailSchema } from "@system/features/node/schemas/templateSchema";
import z from "zod";

const DocumentTemplateDetailSchema = TemplateDetailSchema.extend({
  data: z.object({
    defaultName: z.string(),
    defaultContent: z.record(z.string(), z.unknown()),
  }),
});
type DocumentTemplateDetail = z.infer<typeof DocumentTemplateDetailSchema>;

export { DocumentTemplateDetailSchema, type DocumentTemplateDetail };
