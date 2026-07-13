import type { NodeType } from "@system/registries/plugin";

export type NodeKind = "file" | "folder" | "template";

export interface NodeListOptions {
  includeKinds?: NodeKind[];
  includeTypes?: NodeType[];
  excludeKinds?: NodeKind[];
  excludeTypes?: NodeType[];
}

export interface CreateNodePayload {
  parentId?: string;
  name: string;
  kind: NodeKind;
  type: NodeType;
  data?: Record<string, unknown>;
}
