export const nodeKeys = {
  all: ["nodes"],
  list: () => [...nodeKeys.all, "list"],
  detail: (id: string) => [...nodeKeys.all, "detail", id],
};
