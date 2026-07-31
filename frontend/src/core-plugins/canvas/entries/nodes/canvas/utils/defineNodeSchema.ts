import z from "zod";
import { BaseNodeSchema } from "../schema/BaseNodeSchema";

export const defineNodeSchema = (type: string, dataSchema: z.ZodType) => {
  return BaseNodeSchema.extend({
    type: z.literal(type),
    data: dataSchema,
  });
};
