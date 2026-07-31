import z from "zod";
import { NoteNodeSchema } from "../nodes/note";
import { DocumentHighlightNodeSchema } from "../nodes/document-highlight";

export const NodeSchema = z.discriminatedUnion("type", [
  NoteNodeSchema,
  DocumentHighlightNodeSchema,
]);
export type Node = z.infer<typeof NodeSchema>;

export const EdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string(),
  targetHandle: z.string(),
  type: z.string(),
});
export type Edge = z.infer<typeof EdgeSchema>;

export const DataSchema = z.object({
  nodes: z.array(NodeSchema),
});
export type Data = z.infer<typeof DataSchema>;
