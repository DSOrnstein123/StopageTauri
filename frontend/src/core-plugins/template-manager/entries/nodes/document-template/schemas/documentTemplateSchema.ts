import { TemplateDetailSchema } from "@system/features/node/schemas/templateSchema";
import { NODES } from "../../../../constants";
import z from "zod";

const DocumentTemplateDetailSchema = TemplateDetailSchema.extend({
  type: z.literal(NODES.DOCUMENT_TEMPLATE),
  data: z.object({
    defaultName: z.string(),
    defaultContent: z.record(z.string(), z.unknown()),
  }),
});

export { DocumentTemplateDetailSchema };
