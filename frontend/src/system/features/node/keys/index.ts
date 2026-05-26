import type { NodeFilterOptions } from "../types";

export const nodeKeys = {
  all: ["nodes"] as const,
  lists: () => [...nodeKeys.all, "list"],
  list: (filter?: NodeFilterOptions) => [...nodeKeys.lists(), filter],
  detail: (id: string) => [...nodeKeys.all, "detail", id],
};
