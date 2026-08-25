import { Button } from "@system/shared/ui/shadcn/button";
import { useStore } from "../../definition";
import { useReactFlow } from "@xyflow/react";
import { StickyNote } from "lucide-react";
import { DEFAULT_SIZE } from "./constant";
import { nanoid } from "nanoid";
import { TYPE } from "./identity";

export const CreateButton = () => {
  const addNode = useStore((state) => state.addNode);
  const { screenToFlowPosition } = useReactFlow();
  //TODO: seperate into useAddNode() later
  const handleOnClick = () => {
    const canvas = document.getElementById("canvas");
    const canvasPosition = canvas?.getBoundingClientRect();
    if (canvasPosition) {
      const { width, height, x, y } = canvasPosition;

      const position = screenToFlowPosition({
        x: x + width / 2,
        y: y + height / 2,
      });

      addNode({
        id: nanoid(),
        type: TYPE,
        position: {
          x: position.x - DEFAULT_SIZE.width / 2,
          y: position.y - DEFAULT_SIZE.height / 2 - 50,
        },
        data: { text: "", isEditing: false },
        style: {
          height: DEFAULT_SIZE.height,
          width: DEFAULT_SIZE.width,
        },
      });
    }
  };

  return (
    <Button
      onClick={handleOnClick}
      variant="ghost"
      size="icon"
      className="rounded-sm"
    >
      <StickyNote className="h-4 w-4 scale-150" />
    </Button>
  );
};
