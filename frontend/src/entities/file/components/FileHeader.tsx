import { Separator } from "@shared/components/shadcn/separator";

const FileHeader = ({ className }: { className: string }) => {
  return (
    <div className="relative bg-white">
      <div className={`${className} h-10`}></div>

      <Separator className="absolute top-10 left-0 z-20" />
    </div>
  );
};

export default FileHeader;
