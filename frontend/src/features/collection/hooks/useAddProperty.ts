import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import collectionKeys from "@/features/collection/keys/collectionKeys";
import type { Collection, ColumnSchema } from "../components/collection.types";

export interface AddPropertyParams {
  name: string;
  type: ColumnType;
}

export const useAddProperty = (collectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddPropertyParams) =>
      invoke<ColumnSchema>("add_property", {
        collectionId: collectionId,
        name: params.name,
        propertyType: params.type,
      }),
    onSuccess: (data: ColumnSchema) => {
      queryClient.setQueryData<Collection>(
        collectionKeys.detail(collectionId),
        (oldData) =>
          oldData && { ...oldData, schema: [...oldData.schema, data] },
      );
    },
  });
};
