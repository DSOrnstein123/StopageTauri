import z from "zod";
import { defineNodeSchema } from "../../utils/defineNodeSchema";
import { TYPE } from "./identity";

export const DataSchema = z.object({
  documentId: z.string(),
  highlightId: z.string(),
});
export type Data = z.infer<typeof DataSchema>;

export const NodeSchema = defineNodeSchema(TYPE, DataSchema);
