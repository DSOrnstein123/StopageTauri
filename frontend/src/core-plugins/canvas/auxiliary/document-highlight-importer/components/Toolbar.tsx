import { Button } from "@system/shared/ui/shadcn/button";
import { Plus } from "lucide-react";
import { NodePicker } from "./NodePicker";

export const Toolbar = () => {
  return (
    <div>
      <NodePicker>
        <Button variant="ghost">
          <Plus />
        </Button>
      </NodePicker>
    </div>
  );
};
