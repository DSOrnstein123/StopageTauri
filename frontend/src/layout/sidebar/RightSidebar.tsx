import { useRef } from "react";
import { useWorkspaceStore } from "../dockview/useWorkspaceStore";
import { sidebarRegistry } from "@/registry/sidebarRegistry";
import type { FeatureType } from "@/registry/featureRegistry";

const SidebarRenderer = ({
  type,
}: {
  type: FeatureType | "none" | undefined;
}) => {
  if (!type || type === "none") return null;

  const Component = sidebarRegistry[type];

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
