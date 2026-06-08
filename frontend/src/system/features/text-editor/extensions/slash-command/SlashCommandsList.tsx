import type { CommandItemProps } from "./commands";
import { type Editor, type Range } from "@system/lib/tiptap";

interface SlashCommandsListProps {
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
  editor: Editor;
  range: Range;
}

const SlashCommandsList = (props: SlashCommandsListProps) => {
  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  return (
    <div className="flex flex-col gap-y-0.5 rounded-md border bg-white">
      {props.items.map((command, index) => {
        const Icon = command.icon;

        return (
          <button
            key={index}
            onClick={async () => {
              selectItem(index);
            }}
            className="hover:bg-secondary flex gap-x-1"
          >
            <span>
              <Icon />
            </span>
            {command.name}
          </button>
        );
      })}
    </div>
  );
};

export default SlashCommandsList;
