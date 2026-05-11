import z from "zod";
import { NodeMetadataSchema } from "./nodeSchema";

const TemplateMetadataSchema = NodeMetadataSchema.extend({
  isTemplate: z.literal(true),
});
type TemplateMetadata = z.infer<typeof TemplateMetadataSchema>;
const TemplateMetadataListSchema = z.array(TemplateMetadataSchema);
type TemplateMetadataList = z.infer<typeof TemplateMetadataListSchema>;

const TemplateDetailSchema = TemplateMetadataSchema.extend({
  content: z.record(z.string(), z.string()),
  properties: z.record(z.string(), z.string()),
});
type TemplateDetail = z.infer<typeof TemplateDetailSchema>;
const TemplateDetailListSchema = z.array(TemplateDetailSchema);
type TemplateDetailList = z.infer<typeof TemplateDetailListSchema>;

export {
  TemplateMetadataSchema,
  type TemplateMetadata,
  TemplateMetadataListSchema,
  type TemplateMetadataList,
  TemplateDetailSchema,
  type TemplateDetail,
  TemplateDetailListSchema,
  type TemplateDetailList,
};
