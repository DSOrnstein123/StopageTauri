import { Button } from "@system/components/shadcn/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@system/components/shadcn/popover";
import { useAddProperty } from "@core-plugins/collection/hooks/useAddProperty";
import { COLUMN_TYPES } from "./collection.types";

const AddColumnButton = ({ collectionId }: { collectionId: string }) => {
  const { mutate: addProperty } = useAddProperty(collectionId);

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
