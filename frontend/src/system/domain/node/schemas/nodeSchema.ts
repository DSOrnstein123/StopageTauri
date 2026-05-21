import { pluginRegistry } from "@system/registries/pluginRegistry";
import { IconDataSchema } from "@system/icon/schemas/iconData";
import { SimpleUUIDSchema } from "@system/schemas/simpleUUIDSchema";
import z from "zod";

const NodeKindSchema = z.enum(["file", "folder", "template"]);
type NodeKind = z.infer<typeof NodeKindSchema>;

const NodeMetadataSchema = z.object({
  id: SimpleUUIDSchema,
  parentId: SimpleUUIDSchema.nullable(),
  icon: IconDataSchema,
  name: z.string(),
  type: z.string().refine((val) => pluginRegistry.has(val), {
    message: "This node type is not supported",
  }),
  kind: NodeKindSchema,
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
  NodeKindSchema,
  type NodeKind,
  NodeMetadataSchema,
  type NodeMetadata,
  NodeMetadataListSchema,
  type NodeMetadataList,
  NodeDetailSchema,
  type NodeDetail,
  NodeDetailListSchema,
  type NodeDetailList,
};
