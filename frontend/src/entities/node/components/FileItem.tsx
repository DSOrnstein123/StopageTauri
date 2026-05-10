import { usePrimarySidebarStore } from "@core/layout/sidebar/primarySidebarStore";
import { useWorkspaceStore } from "@shared/lib/dockview/useWorkspaceStore";
import { cn } from "@shared/lib/tailwind-css/utils";

interface FileItemProps {
  id: string;
  name: string;
}

const FileItem = ({ id, name }: FileItemProps) => {
  const openFile = useWorkspaceStore((state) => state.openFile);
  const isSelected = usePrimarySidebarStore((state) => state.selectedId === id);

  const handleOnClick = async () => {
    openFile(id, name);
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "h-7 rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
        isSelected ? "bg-[#e3e3e3] font-medium" : "",
      )}
    >
      <div>{name ? name : "New document"}</div>
    </div>
  );
};

export default FileItem;
