import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@system/components/shadcn/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@system/components/shadcn/hover-card";
import { COLUMN_TYPES, type ColumnSchema } from "./collection.types";

const ColumnHeaderWithConfiguration = ({
  schema,
}: {
  schema: ColumnSchema;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="hover:cursor-pointer">{schema.name}</div>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col">
        <input value={schema.name} />

        <HoverCard>
          <HoverCardTrigger>Change type</HoverCardTrigger>

          <HoverCardContent className="flex flex-col">
            {COLUMN_TYPES.map((type) => (
              <div>{type}</div>
            ))}
          </HoverCardContent>
        </HoverCard>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnHeaderWithConfiguration;
