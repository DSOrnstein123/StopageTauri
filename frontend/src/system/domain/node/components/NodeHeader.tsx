import { Separator } from "@system/components/shadcn/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NodeHeader = ({ className }: { className: string }) => {
  return (
    <div className={`${className} relative flex items-center bg-white p-2`}>
      <div className="flex h-full items-center">
        <ChevronLeft />
        <ChevronRight />
      </div>

      <div className="h-full w-full flex-1 rounded-full bg-gray-400"></div>

      <Separator className="absolute top-10 left-0 z-20" />
    </div>
  );
};

export default NodeHeader;
