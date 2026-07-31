import { Hand, MousePointer } from "lucide-react";
import { useStore } from "../../definition";
import { Card } from "@system/shared/ui/shadcn/card";
import { Button } from "@system/shared/ui/shadcn/button";
import { CreateNoteNodeButton } from "../../nodes/note";
import { useSave } from "../../hooks/useSave";

const Controller = () => {
  const tool = useStore((state) => state.tool);
  const { mutate: save } = useSave();

  return (
    <Card className="absolute top-1/2 left-2.5 z-20 flex w-11.5 -translate-y-1/2 flex-col gap-y-1 rounded-lg p-1">
      <Button variant="ghost" size="icon" className="rounded-sm">
        {tool === "select" ? (
          <MousePointer
            strokeWidth="2.5"
            className="h-4 w-4 scale-130 rotate-13"
            fill="#000"
          />
        ) : (
          <Hand className="h-4 w-4 scale-130" />
        )}
      </Button>

      <CreateNoteNodeButton />

      <Button variant="ghost" size="icon" className="rounded-sm">
        <MousePointer
          strokeWidth="2.5"
          className="h-4 w-4 scale-130 rotate-13"
          fill="#000"
        />
      </Button>

      <Button onClick={() => save()}>ok</Button>
    </Card>
  );
};

export default Controller;
