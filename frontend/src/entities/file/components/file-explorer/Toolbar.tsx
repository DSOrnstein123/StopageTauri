import { Button } from "@shared/components/shadcn/button";
import { FolderPlus } from "lucide-react";

const Toolbar = () => {
  return (
    <div className="flex h-10 items-center justify-center gap-x-2">
      <Button variant="ghost">
        <FolderPlus />
      </Button>
    </div>
  );
};

export default Toolbar;
