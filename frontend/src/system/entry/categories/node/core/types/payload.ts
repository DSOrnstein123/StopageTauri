import type { NodeType } from "@system/plugin-manager/plugin";
import type { NodeKind } from "../schema";

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
