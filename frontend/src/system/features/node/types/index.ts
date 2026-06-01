export type NodeKind = "file" | "folder" | "template";

export interface NodeFilterOptions {
  includeKinds?: NodeKind[];
  includeTypes?: string[];
  excludeKinds?: NodeKind[];
  excludeTypes?: string[];
}

export interface CreateNodePayload {
  parentId?: string;
  name: string;
  kind: NodeKind;
  type: string;
  data?: Record<string, unknown>;
}
