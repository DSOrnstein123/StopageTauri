import type { IDockviewPanelHeaderProps } from "dockview";
import { X } from "lucide-react";
import DynamicTitle from "./DynamicTitle";
import useIsActiveTab from "@system/features/workspace/hooks/useIsActiveTab";

const WorkspaceTab = (props: IDockviewPanelHeaderProps) => {
  const { api, params } = props;
  const isActive = useIsActiveTab(api.id);
  const tabMode = params.mode;

  const onTabClick = () => {
    api.setActive();
  };

  const onCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    api.close();
  };

  return (
    <div
      onClick={onTabClick}
      className={`group flex h-full max-w-20 min-w-30 cursor-pointer items-center justify-between border-r px-3 text-sm transition-colors ${
        isActive ? "text-blue-400" : "text-gray-400"
      }`}
    >
      <div className="flex items-center gap-2 truncate">
        <span className="truncate">
          {tabMode == "dynamic" ? (
            <DynamicTitle id={params.nodeId} />
          ) : (
            api.title
          )}
        </span>
      </div>

      <button
        onClick={onCloseClick}
        className={`ml-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-700 ${
          isActive ? "opacity-100" : ""
        }`}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default WorkspaceTab;
