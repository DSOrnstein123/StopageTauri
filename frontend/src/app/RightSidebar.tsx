import { useRef } from "react";
import { useWorkspaceStore } from "../core/layout/dockview/useWorkspaceStore";
import { featureRegistry } from "@/app/init";

const SidebarRenderer = ({ type }: { type: string }) => {
  if (!type) return null;
  /* eslint-disable react-hooks/static-components */
  const Component = featureRegistry.getSidebarComponent(type);

  if (!Component) return null;

  return <Component />;
};

const RightSidebar = () => {
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const type = useWorkspaceStore((state) => state.activePanelInfo?.type);

  return (
    <aside
      ref={rightSidebarRef}
      className="group/sidebar bg-primary/5 relative z-20 h-full flex-col space-y-0.5"
    >
      <div className="h-full overflow-x-hidden overflow-y-auto p-2">
        <SidebarRenderer type={type} />
      </div>
    </aside>
  );
};

export default RightSidebar;
