import z from "zod";

export const DataSchema = z.object({
  nodeId: z.string(),
  resourceId: z.string(),
});
export type Data = z.infer<typeof DataSchema>;
