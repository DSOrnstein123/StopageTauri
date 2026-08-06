import { usePrimarySidebarStore } from "@app/shell/sidebar/primarySidebarStore";
import { cn } from "@system/lib/tailwind-css/utils";
import type { ExplorerItem } from "../schemas/explorerItemSchema";
import { systemApi } from "@system/api";
import Icon from "@system/shared/ui/icon/Icon";

const FileItem = ({ data }: { data: ExplorerItem }) => {
  const { id, name, type } = data;
  const isSelected = usePrimarySidebarStore((state) => state.selectedId === id);

  const handleOnClick = () => {
    systemApi.workbench.openEntry({
      zone: "workspace",
      entryCategory: "node",
      title: name,
      nodeId: id,
      nodeType: type,
    });
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "flex h-7 items-center gap-x-1 rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
        isSelected ? "bg-[#e3e3e3] font-medium" : "",
      )}
    >
      <Icon data={data.icon} size={17} />
      <div>{name ? name : "New document"}</div>
    </div>
  );
};

export default FileItem;
