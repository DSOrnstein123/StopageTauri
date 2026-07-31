import z from "zod";
import { defineNodeSchema } from "../../utils/defineNodeSchema";
import { TYPE } from "./identity";

export const DataSchema = z.object({
  text: z.string(),
});
export type Data = z.infer<typeof DataSchema>;

export const NodeSchema = defineNodeSchema(TYPE, DataSchema);
