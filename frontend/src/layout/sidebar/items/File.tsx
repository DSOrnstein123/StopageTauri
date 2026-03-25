import { cn } from "@/shared/lib/utils";
import { usePrimarySidebarStore } from "@/layout/sidebar/primarySidebarStore";
import { useWorkspaceStore } from "@/layout/dockview/useWorkspaceStore";

interface FileProps {
  id: string;
  title: string;
}

const File = ({ id, title }: FileProps) => {
  const openFile = useWorkspaceStore((state) => state.openFile);
  const isSelected = usePrimarySidebarStore((state) => state.selectedId === id);

  const handleOnClick = () => {
    openFile("document", id, title);
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "h-7 rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
        isSelected ? "bg-[#e3e3e3] font-medium" : "",
      )}
    >
      <div>{title ? title : "New document"}</div>
    </div>
  );
};

export default File;
