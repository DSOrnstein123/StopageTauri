export const fileKeys = {
  all: ["files"],
  list: () => [...fileKeys.all, "list"],
  detail: (id: string) => [...fileKeys.all, "detail", id],
};
