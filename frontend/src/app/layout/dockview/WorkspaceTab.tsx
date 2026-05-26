import { useWorkspaceStore } from "@system/lib/dockview/useWorkspaceStore";
import type { IDockviewPanelHeaderProps } from "dockview";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import DynamicTitle from "./DynamicTitle";

const WorkspaceTab = (props: IDockviewPanelHeaderProps) => {
  const dockApi = useWorkspaceStore((state) => state.dockApi);
  const { api, params } = props;
  const [isActive, setIsActive] = useState(api.isActive);
  const tabMode = params.mode;

  useEffect(() => {
    if (!dockApi) return;

    const disposable = dockApi?.onDidActivePanelChange((event) => {
      if (!event) return;

      setIsActive(event.api.isActive);
    });

    return () => disposable?.dispose();
  });

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
          {tabMode == "dynamic" ? <DynamicTitle id={params.id} /> : api.title}
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
