import { Button } from "@/shared/components/shadcn/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/shadcn/popover";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

const AddColumnButton = () => {
  const { mutate: addProperty } = useMutation({
    mutationFn: () =>
      invoke("add_property", {
        collectionId: id,
        name: name,
        propertyType: type,
      }),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>+</Button>
      </PopoverTrigger>

      <PopoverContent>
        <Button onClick={() => addProperty}>ok</Button>
      </PopoverContent>
    </Popover>
  );
};

export default AddColumnButton;
