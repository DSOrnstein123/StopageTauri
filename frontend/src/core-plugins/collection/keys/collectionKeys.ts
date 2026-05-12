const collectionKeys = {
  all: ["collections"] as const,
  lists: () => [...collectionKeys.all, "list"] as const,
  detail: (id: string) => [...collectionKeys.all, "detail", id] as const,
  documentList: (collectionId: string) =>
    [...collectionKeys.all, "document-list", collectionId] as const,
};

export default collectionKeys;
