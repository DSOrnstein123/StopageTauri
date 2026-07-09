import z from "zod";

const CreateTemplateSchema = z.object({
  name: z.string().nonempty({ message: "File name is required" }),
  defaultName: z.string(),
  duplicateName: z.boolean().default(true),
});
type CreateTemplateValues = z.infer<typeof CreateTemplateSchema>;

export { CreateTemplateSchema, type CreateTemplateValues };
