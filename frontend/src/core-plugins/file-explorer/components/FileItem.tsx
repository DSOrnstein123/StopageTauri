import { usePrimarySidebarStore } from "@app/layout/sidebar/primarySidebarStore";
import { useWorkspaceStore } from "@system/lib/dockview/useWorkspaceStore";
import { cn } from "@system/lib/tailwind-css/utils";
import type { ExplorerItem } from "../schemas/explorerItemSchema";

const FileItem = ({ data }: { data: ExplorerItem }) => {
  const { id, name, type } = data;
  const openTab = useWorkspaceStore((state) => state.openTab);
  const isSelected = usePrimarySidebarStore((state) => state.selectedId === id);

  const handleOnClick = async () => {
    openTab({
      id: id,
      name: name,
      type: type,
      mode: "dynamic",
    });
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
