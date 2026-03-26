import { useRef } from "react";
import { sidebarComponentList } from "./sidebarComponentList";
import { useWorkspaceStore } from "../dockview/useWorkspaceStore";

const RightSidebar = () => {
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const type = useWorkspaceStore((state) => state.activePanelInfo?.type);
  const SidebarComponent = sidebarComponentList[type || "none"];

  return (
    <aside
      ref={rightSidebarRef}
      className="group/sidebar bg-primary/5 relative z-20 h-full flex-col space-y-0.5"
    >
      <div className="h-full overflow-x-hidden overflow-y-auto p-2">
        <SidebarComponent />
      </div>
    </aside>
  );
};

export default RightSidebar;
