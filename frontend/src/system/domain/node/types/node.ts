export type NodeKind = "file" | "folder" | "template";

export interface NodeFilterOptions {
  includeKinds?: NodeKind[];
  includeTypes?: string[];
  excludeKinds?: NodeKind[];
  excludeTypes?: string[];
}
