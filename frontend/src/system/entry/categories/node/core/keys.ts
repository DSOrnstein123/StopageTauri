import type { NodeListOptions } from "./types/payload";

export const nodeKeys = {
  all: ["nodes"] as const,
  lists: () => [...nodeKeys.all, "list"],
  list: (filter?: NodeListOptions) => [...nodeKeys.lists(), filter],
  detail: (id: string) => [...nodeKeys.all, "detail", id],
};
