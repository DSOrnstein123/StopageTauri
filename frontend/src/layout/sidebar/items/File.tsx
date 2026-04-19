import { cn } from "@/shared/lib/utils";
import { usePrimarySidebarStore } from "@/layout/sidebar/primarySidebarStore";
import { useWorkspaceStore } from "@/layout/dockview/useWorkspaceStore";

interface FileProps {
  id: string;
  name: string;
}

const File = ({ id, name }: FileProps) => {
  const openFile = useWorkspaceStore((state) => state.openFile);
  const isSelected = usePrimarySidebarStore((state) => state.selectedId === id);

  const handleOnClick = () => {
    openFile("document", name, { documentId: id });
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

export default File;
