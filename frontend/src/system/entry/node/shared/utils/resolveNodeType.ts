import type { NodeKind } from "../schemas";

export const resolveNodeType = (kind: NodeKind, type: string) => {
  return kind == "template" ? `${type}:template` : type;
};
