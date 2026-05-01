import type { IDockviewPanelHeaderProps } from "dockview";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const WorkspaceTab = (props: IDockviewPanelHeaderProps) => {
  const { api } = props;
  const isActive = api.isActive;
  const [title, setTitle] = useState(api.title);

  const onTabClick = () => {
    api.setActive();
  };

  const onCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    api.close();
  };

  useEffect(() => {
    const disposable = api.onDidTitleChange(() => {
      setTitle(api.title);
    });
    return () => disposable.dispose();
  }, [api]);

  return (
    <div
      onClick={onTabClick}
      className={`group flex h-full max-w-20 min-w-30 cursor-pointer items-center justify-between border-r border-gray-700/50 px-3 text-sm transition-colors ${
        isActive
          ? "bg-gray-800 text-blue-400"
          : "bg-gray-900 text-gray-400 hover:bg-gray-800/50"
      }`}
    >
      <div className="flex items-center gap-2 truncate">
        <span className="truncate">{title}</span>
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
