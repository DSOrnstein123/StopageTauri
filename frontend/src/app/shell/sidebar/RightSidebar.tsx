import { systemApi } from "@system/api";
import { useRightSidebarStore } from "@system/stores/useSidebarStore";
import { useRef } from "react";

//TODO: add auxiliary later
const RightSidebar = () => {
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const type = useRightSidebarStore((state) => state.type);

  if (!type) return null;

  /* eslint-disable react-hooks/static-components */
  const SidebarContent = systemApi.plugin.getNodeSlot(type, "sidebar");
  if (!SidebarContent) return null;

  return (
    <aside
      ref={rightSidebarRef}
      className="group/sidebar bg-primary/5 relative z-20 h-full flex-col space-y-0.5"
    >
      <div className="h-full overflow-x-hidden overflow-y-auto p-2">
        {/* <SidebarContent /> */}
      </div>
    </aside>
  );
};

export default RightSidebar;
