import z from "zod";

const IconDataSchema = z.object({
  type: z.enum(["lucide"]),
  value: z.string(),
});

type IconData = z.infer<typeof IconDataSchema>;

export { IconDataSchema, type IconData };
