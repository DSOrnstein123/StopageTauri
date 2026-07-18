import z from "zod";
import { DocumentDataSchema } from "../../document/public";

const DataSchema = z.object({
  defaultName: z.string(),
  defaultData: DocumentDataSchema,
});
type Data = z.infer<typeof DataSchema>;

export { DataSchema, type Data };
