import { useEffect, useRef } from "react";
import Resizer from "./Resizer";
import useRightSidebarStore from "@/layout/sidebar/rightSidebarStore";
import { sidebarComponentList } from "./sidebarComponentList";

const RightSidebar = () => {
  const width = useRightSidebarStore((state) => state.width);
  const setWidth = useRightSidebarStore((state) => state.setWidth);
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const type = useRightSidebarStore((state) => state.type);
  const SidebarComponent = sidebarComponentList[type];

  useEffect(() => {
    if (!rightSidebarRef.current) return;
    rightSidebarRef.current.style.width = `${width}px`;
  }, [width]);

  return (
    <aside
      ref={rightSidebarRef}
      className="group/sidebar bg-primary/5 relative z-20 h-full w-56 flex-col space-y-0.5"
    >
      <Resizer
        sidebarRef={rightSidebarRef}
        position="left"
        setWidth={setWidth}
      />

      <div className="h-full overflow-x-hidden overflow-y-auto p-2">
        <SidebarComponent />
      </div>
    </aside>
  );
};

export default RightSidebar;
