import { Button } from "@/shared/components/shadcn/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/shadcn/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import {
  COLUMN_TYPES,
  type Collection,
  type ColumnSchema,
  type ColumnType,
} from "./collection.types";
import collectionKeys from "@/features/document/hooks/collectionKeys";

interface AddPropertyParams {
  name: string;
  type: ColumnType;
}

const AddColumnButton = ({ collectionId }: { collectionId: string }) => {
  const queryClient = useQueryClient();
  const { mutate: addProperty } = useMutation({
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>+</Button>
      </PopoverTrigger>

      <PopoverContent>
        {COLUMN_TYPES.map((type) => (
          <Button
            key={type}
            onClick={() =>
              addProperty({
                name: "ok",
                type: type,
              })
            }
          >
            {type}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default AddColumnButton;
