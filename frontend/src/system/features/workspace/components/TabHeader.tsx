import { ChevronLeft, ChevronRight } from "lucide-react";

const TabHeader = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} relative flex items-center border-b bg-white p-2`}
    >
      <div className="flex h-full items-center">
        <ChevronLeft />
        <ChevronRight />
      </div>

      <div className="h-full w-full flex-1 rounded-full bg-gray-400"></div>
    </div>
  );
};

export default TabHeader;
