import { Button } from "@system/components/shadcn/button";
import { FolderPlus, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

const Toolbar = () => {
  const [isAsc, setIsAsc] = useState(true);

  return (
    <div className="flex h-10 items-center justify-center gap-x-2">
      <Button variant="ghost">
        <FolderPlus />
      </Button>

      <Button variant="ghost" onClick={() => setIsAsc((prev) => !prev)}>
        {isAsc ? <SortAsc /> : <SortDesc />}
      </Button>
    </div>
  );
};

export default Toolbar;
