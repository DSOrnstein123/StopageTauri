import { useRef } from "react";
import { useRightSidebarStore } from "@shared/useSidebarStore";
import { resolveSidebarComponent } from "./resolveSidebarComponent";

const RightSidebar = () => {
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const type = useRightSidebarStore((state) => state.type);

  /* eslint-disable react-hooks/static-components */
  const SidebarContent = resolveSidebarComponent(type);
  if (!SidebarContent) return null;

  return (
    <aside
      ref={rightSidebarRef}
      className="group/sidebar bg-primary/5 relative z-20 h-full flex-col space-y-0.5"
    >
      <div className="h-full overflow-x-hidden overflow-y-auto p-2">
        <SidebarContent />
      </div>
    </aside>
  );
};

export default RightSidebar;
