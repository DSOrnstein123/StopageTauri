import { SimpleUUIDSchema } from "@/shared/schemas/simpleUUIDSchema";
import z from "zod";

const BasePropertySchema = z.object({
  id: SimpleUUIDSchema,
  name: z.string(),
});

const RawPropertiesSchema = z.record(z.string(), z.string()).default({});
type RawProperties = z.infer<typeof RawPropertiesSchema>;

const PropertySchema = z.discriminatedUnion("type", [
  BasePropertySchema.extend({
    type: z.literal("text"),
    value: z.string(),
  }),
  BasePropertySchema.extend({
    type: z.literal("select"),
    options: z.array(z.string()),
    value: z.string(),
  }),
]);
type Property = z.infer<typeof PropertySchema>;

const PropertyListSchema = z.array(PropertySchema).default([]);
type PropertyList = z.infer<typeof PropertyListSchema>;

export {
  RawPropertiesSchema,
  type RawProperties,
  PropertySchema,
  type Property,
  PropertyListSchema,
  type PropertyList,
};
