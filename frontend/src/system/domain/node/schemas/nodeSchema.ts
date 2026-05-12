import { pluginRegistry } from "@system/registries/pluginRegistry";
import { IconDataSchema } from "@system/schemas/iconData";
import { SimpleUUIDSchema } from "@system/schemas/simpleUUIDSchema";
import z from "zod";

export type NodeGroup = "file" | "folder" | "template";

const NodeMetadataSchema = z.object({
  id: SimpleUUIDSchema,
  parentId: SimpleUUIDSchema.nullable(),
  icon: IconDataSchema,
  name: z.string(),
  type: z.string().refine((val) => pluginRegistry.has(val), {
    message: "This node type is not supported",
  }),
  isTemplate: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isTrashed: z.boolean(),
});
type NodeMetadata = z.infer<typeof NodeMetadataSchema>;
const NodeMetadataListSchema = z.array(NodeMetadataSchema);
type NodeMetadataList = z.infer<typeof NodeMetadataListSchema>;

const NodeDetailSchema = NodeMetadataSchema.extend({
  content: z.record(z.string(), z.string()),
  properties: z.record(z.string(), z.string()),
});
type NodeDetail = z.infer<typeof NodeDetailSchema>;
const NodeDetailListSchema = z.array(NodeDetailSchema);
type NodeDetailList = z.infer<typeof NodeDetailListSchema>;

export {
  NodeMetadataSchema,
  type NodeMetadata,
  NodeMetadataListSchema,
  type NodeMetadataList,
  NodeDetailSchema,
  type NodeDetail,
  NodeDetailListSchema,
  type NodeDetailList,
};
