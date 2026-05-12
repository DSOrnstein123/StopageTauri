import type { NodeGroup } from "../schemas/nodeSchema";

export const nodeKeys = {
  all: ["nodes"] as const,
  lists: () => [...nodeKeys.all, "list"],
  list: (group: NodeGroup) => [...nodeKeys.lists(), group],
  detail: (id: string) => [...nodeKeys.all, "detail", id],
};
