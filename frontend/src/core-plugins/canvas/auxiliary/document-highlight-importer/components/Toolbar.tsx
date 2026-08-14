import { Button } from "@system/shared/ui/shadcn/button";
import { Plus } from "lucide-react";
import { DocumentPicker } from "./DocumentPicker";

export const Toolbar = () => {
  return (
    <div>
      <DocumentPicker>
        <Button variant="ghost">
          <Plus />
        </Button>
      </DocumentPicker>
    </div>
  );
};
