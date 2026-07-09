import type { NodeType } from "@system/registries/plugin";
import { pluginManager } from "@system/registries/pluginManager";
import { IconDataSchema } from "@system/schemas/iconData";
import { SimpleUUIDSchema } from "@system/schemas/simpleUUIDSchema";
import z from "zod";

const NodeKindSchema = z.enum(["file", "folder", "template"]);
type NodeKind = z.infer<typeof NodeKindSchema>;

const NodeMetadataSchema = z.object({
  id: SimpleUUIDSchema,
  parentId: SimpleUUIDSchema.nullable(),
  icon: IconDataSchema,
  name: z.string(),
  kind: NodeKindSchema,
  type: z.custom<NodeType>(
    (val): val is NodeType =>
      typeof val === "string" && pluginManager.hasNode(val),
    {
      message: "This node type is not supported",
    },
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  isTrashed: z.boolean(),
});
type NodeMetadata = z.infer<typeof NodeMetadataSchema>;
const NodeMetadataListSchema = z.array(NodeMetadataSchema);
type NodeMetadataList = z.infer<typeof NodeMetadataListSchema>;

const NodeDetailSchema = NodeMetadataSchema.extend({
  data: z.record(z.string(), z.unknown()),
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
