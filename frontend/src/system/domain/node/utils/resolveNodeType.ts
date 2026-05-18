import type { NodeKind } from "../schemas/nodeSchema";

export const resolveNodeType = (kind: NodeKind, type: string) => {
  return kind == "template" ? `${type}:template` : type;
};
