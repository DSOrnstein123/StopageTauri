import { useGetDetailsQuery } from "@system/entry/categories/node/core/hooks/useGetDetailsQuery";

export const useImportedNodeList = (ids: string[]) => {
  return useGetDetailsQuery(ids);
};
