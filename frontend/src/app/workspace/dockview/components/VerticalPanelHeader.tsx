import { systemApi } from "@system/api";
import type { IDockviewPanelHeaderProps } from "dockview-core";
import { X } from "lucide-react";

export const VerticalPanelHeader = (props: IDockviewPanelHeaderProps) => {
  const { api } = props;
  const isActive = api.isActive;

  const onCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    systemApi.workbench.closeTab(api.id);
  };

  return (
    <div
      onClick={() => api.setActive()}
      className={`group flex h-full w-full cursor-pointer flex-col items-center justify-between py-2 text-xs transition-colors ${
        isActive ? "text-blue-400" : "text-gray-400"
      } `}
    >
      <span className="[text-orientation:upright] [writing-mode:vertical-rl]">
        {api.title}
      </span>

      <button
        onClick={onCloseClick}
        className="rounded-md p-1 opacity-0 group-hover:opacity-100"
      >
        <X size={12} />
      </button>
    </div>
  );
};
