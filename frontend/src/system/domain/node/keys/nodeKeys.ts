import type { NodeGroup } from "../schemas/nodeSchema";

export const nodeKeys = {
  all: ["nodes"],
  list: (group: NodeGroup) => [...nodeKeys.all, "list", group],
  detail: (id: string) => [...nodeKeys.all, "detail", id],
};
